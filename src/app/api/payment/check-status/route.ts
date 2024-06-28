const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
import Order from "@/lib/models/order.model";
import Transaction from "@/lib/models/transaction.model";
import connectToDB from "@/lib/mongoose";
import * as crypto from "crypto";
import * as https from "https";
import { NextResponse } from "next/server";

interface MomoResponse {
  orderId: string;
  message: string;
  transId: string;
}

export const PATCH = async (req: Request) => {
  const { id } = await req.json();

  try {
    // Get orderId from DB
    await connectToDB();
    const transaction = await Transaction.findOne({ _id: id });
    const orderId = transaction?.orderId;

    if (!orderId) {
      throw new Error("Order ID not found in transaction");
    }

    const requestId = partnerCode + new Date().getTime();

    // Signature
    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;

    const signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      requestId: requestId,
      orderId: orderId,
      lang: "en",
      signature: signature,
    });

    // Create a function that returns a promise
    const sendRequest = (): Promise<MomoResponse> => {
      return new Promise((resolve, reject) => {
        const options = {
          hostname: "test-payment.momo.vn",
          port: 443,
          path: "/v2/gateway/api/query",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
          },
        };

        const checkStatusReq = https.request(options, (momoRes) => {
          let data = "";

          momoRes.on("data", (chunk) => {
            data += chunk;
          });

          momoRes.on("end", () => {
            resolve(JSON.parse(data) as MomoResponse);
          });
        });

        checkStatusReq.on("error", (e) => {
          reject(e);
        });

        // Write data to request body and send the request
        checkStatusReq.write(requestBody);
        checkStatusReq.end();
      });
    };

    const resBodyObj = await sendRequest();
    console.log("--------------------RESPONSE----------------");
    console.log(resBodyObj);

    // Update status và transId trong DB
    const orderIdFromMomo = resBodyObj.orderId;

    await connectToDB();
    const transactionToUpdate = await Transaction.findOne({
      _id: id,
    });
    const order = await Order.findOne({ transactionId: id });

    if (!transactionToUpdate || !order) {
      throw new Error("Transaction or order not found");
    }

    console.log("--------------------TRANSACTION----------------");
    console.log(transactionToUpdate);
    order.status = resBodyObj.message;
    await order.save();
    transactionToUpdate.transId = resBodyObj.transId;
    transactionToUpdate.status = resBodyObj.message;
    await transactionToUpdate.save();

    return NextResponse.json(resBodyObj);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" });
  }
};
