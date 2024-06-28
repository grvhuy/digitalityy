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
  const { amount, transId, description } = await req.json();
        const TID = transId;
        try {
            const orderId = partnerCode + new Date().getTime();
            const requestId = partnerCode + new Date().getTime();
            //Signature
            const rawSignature = `accessKey=${accessKey}&amount=${amount}&description=${description}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}&transId=${transId}`;

            const signature = crypto
                .createHmac("sha256", secretkey)
                .update(rawSignature)
                .digest("hex");
            console.log("--------------------SIGNATURE----------------");
            console.log(signature);

            const requestBody = JSON.stringify({
                partnerCode: partnerCode,
                requestId: requestId,
                orderId,
                amount: amount,
                transId: transId,
                lang: "en",
                description: description,
                signature: signature,
            });

            // Create the HTTPS request
            const options = {
                hostname: "test-payment.momo.vn",
                port: 443,
                path: "/v2/gateway/api/refund",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(requestBody),
                },
            };

            //Xu ly Response
            const checkStatusReq = https.request(options, (momoRes) => {
                // console.log(`Status: ${momoRes.statusCode}`);
                // console.log(`Headers: ${JSON.stringify(momoRes.headers)}`);
                momoRes.setEncoding("utf8");

                momoRes.on("data", async (body) => {
                    console.log("Body:");
                    console.log(body);
                    const resBodyObj = JSON.parse(body);
                    console.log(resBodyObj);
                    //Refund thành công thì cập nhật lại transaction trong DB
                    if (resBodyObj.resultCode === 0) {
                        connectToDB();
                        const transaction = await Transaction.findOne({
                            transId: TID,
                        });
                        transaction.status = "Refunded.";
                        transaction.refundInfo.push(resBodyObj);
                        transaction.save();
                    }
                });
            });

            checkStatusReq.on("error", (e) => {
                console.log(`Problem with request: ${e.message}`);
            });

            // Write data to request body and send the request
            checkStatusReq.write(requestBody);
            checkStatusReq.end();
            return NextResponse.json({ message: "Refund success." });
        } catch (error) {
            console.error("Error refund:", error);
            return NextResponse.json({ message: "Refund failed."});
        }
}