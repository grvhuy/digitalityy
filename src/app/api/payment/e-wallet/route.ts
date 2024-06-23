import Cart from "@/lib/models/cart.model";
import Order from "@/lib/models/order.model";
import Transaction from "@/lib/models/transaction.model";
import connectToDB from "@/lib/mongoose";
import * as crypto from "crypto";
import * as https from "https";
import { NextResponse } from "next/server";

const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

export const POST = async (req: Request) => {
  connectToDB();
  const requestId = "DGTL" + new Date().getTime().toString();
  const orderId = requestId;
  const extraData = "extraData";

  const {
    amount,
    redirectUrl,
    ipnUrl,
    requestType,
    userInfo,
    deliveryInfo,
    items,
    orderInfo,
    shippingInfo
  } = await req.json();


  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "vi",
    userInfo: userInfo,
  });

  const options = {
    method: "POST",
    hostname: "test-payment.momo.vn",
    path: "/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  const resBodyObject = await new Promise((resolve, reject) => {
    const request = https.request(options, (momoResponse) => {
      let resBody = "";
      momoResponse.setEncoding("utf-8");
      momoResponse.on("data", (data) => {
        resBody += data;
      });

      momoResponse.on("end", () => {
        const parsedBody = JSON.parse(resBody);
        resolve(parsedBody);
      });
    });

    request.on("error", (e) => {
      reject(e);
    });

    request.write(requestBody);
    request.end();
  });

  const transaction = new Transaction({
    orderId: orderId,
    userInfo: userInfo,
    deliveryInfo: deliveryInfo,
    items: items,
    amount: amount,
    status: "pending",
    transactionInfo: resBodyObject,
  });

  await transaction.save();


  if (requestType === "COD") {
    const order = new Order({
      userId: userInfo.userId,
      address: deliveryInfo.deliveryAddress._id,
      items: items,
      status: "pending",
      subtotal: amount,
      paymentMethod: "COD",
      location: deliveryInfo.location,
      shippingInfo: shippingInfo,
      
      // location: deliveryInfo.location,
    });
    await order.save();
    return NextResponse.json(requestType);
  }

  const order = new Order({
    userId: userInfo.userId,
    address: deliveryInfo.deliveryAddress._id,
    items: items,
    status: "pending",
    subtotal: amount,
    paymentMethod: "momo",
    location: deliveryInfo.location,
    transactionId: transaction._id,
    shippingInfo: shippingInfo,
  });
  await order.save();

  // Delete san pham khi mua
  items.map(async (item: any) => {
    const cart = await Cart.findOne({ user: userInfo.userId });
    const cartItems = cart.products;
    const newCartItems = cartItems.filter(
      (cartItem: any) => cartItem.product != item.id
    );
    await Cart.updateOne(
      { user: userInfo.userId },
      { products: newCartItems }
    );
  })


  // bad request do items bi sai

  return NextResponse.json(resBodyObject);
};
