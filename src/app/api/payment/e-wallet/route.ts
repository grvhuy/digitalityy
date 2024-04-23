import * as crypto from "crypto";
import * as https from "https";
import { NextResponse } from "next/server";

const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const requestType = "captureWallet";
const requestTypeATM = "payWithATM";
const requestTypeCreditCard = "payWithCC";
const redirectUrl = "http://localhost:3000/transactions";
const ipnUrl = "http://localhost:3000/";

const userInfo = {
  id: "UserId",
};

const deliveryInfo = {
  id: "DeliveryId",
};

const orderInfo = "YOMOST Bac Ha&Viet Quat 170ml";

const items = [
  {
    id: "204727",
    name: "YOMOST Bac Ha&Viet Quat 170ml",
    description: "YOMOST Sua Chua Uong Bac Ha&Viet Quat 170ml/1 Hop",
    category: "beverage",
    imageUrl: "https://momo.vn/uploads/product1.jpg",
    manufacturer: "Vinamilk",
    price: 11000,
    currency: "VND",
    quantity: 5,
    unit: "hộp",
    totalPrice: 55000,
    taxAmount: "200",
  },
];

export const POST = (req: Request) => {
  const body = req.json();
  const requestId = partnerCode + new Date().getTime();
  const amount = 55000;
  const orderId = requestId;
  const extraData =
    "merchantName=;merchantId=" +
    userInfo.id +
    ";deliveryId=" +
    deliveryInfo.id;
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

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
    lang: "en",
    userInfo: userInfo,
    deliveryInfo: deliveryInfo,
    items: items,
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

  const request = https.request(options, (momoResponse) => {
    momoResponse.setEncoding("utf-8");
    let resBody = "";
    momoResponse.on("data", (data) => {
      resBody += data;
      console.log("--------------------RESPONSE BODY----------------");
      console.log(resBody);
      const resBodyObject = JSON.parse(resBody);
    });
  });

  request.on("error", (e) => {
    console.log(`Problem with request: ${e.message}`);
  });

  console.log("Sending Momo payment request...");
  request.write(requestBody);
  request.end();
  return NextResponse.json({ message: "Payment request sent" });
};
