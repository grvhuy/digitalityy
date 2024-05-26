import Transaction from "@/lib/models/transaction.model";
import * as crypto from "crypto";
import * as https from "https";
import { NextResponse } from "next/server";

const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
// const requestType = "captureWallet";

export const POST = async (req: Request) => {
  // const { requestType } = await req.json();
  // return NextResponse.json(requestType);
  try {
    const requestId = partnerCode + new Date().getTime().toString();
    const orderId = requestId;
    const extraData = "asds";

    const { amount, redirectUrl, ipnUrl, requestType, userInfo, deliveryInfo, items, orderInfo } = await req.json();

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
    

    return NextResponse.json(resBodyObject);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Error");
  }
};
