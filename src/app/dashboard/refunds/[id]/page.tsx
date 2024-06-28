"use client";
import { StepperActive } from "@/components/Stepper";
import { StepperDeactive } from "@/components/StepperDeactive";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@nextui-org/input";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RefundDetailPage = () => {
  const id = usePathname().split("/").pop();
  const [order, setOrder] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [transactionId, setTransactionId] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [isEnableUpdate, setIsEnableUpdate] = useState(false);
  const [location, setLocation] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [status, setStatus] = useState("");
  const [refund, setRefund] = useState<any>(null);
  const [orderId, setOrderId] = useState<any>(null);

  const [transId, setTransId] = useState<any>(null);
  const [refundStatus, setRefundStatus] = useState("");
  const [refundAmount, setRefundAmount] = useState<any>(0);

  useEffect(() => {
    axios.get(`/api/dashboard/refunds/${id}`).then((res) => {
      console.log(res.data);
      setRefund(res.data);
      setOrderId(res.data.order._id);
    });
  }, []);

  useEffect(() => {
    if (!orderId) return;

    axios.get(`/api/dashboard/orders/${orderId}`).then((res) => {
      setOrder(res.data);
      setUserId(res.data.userId);
      setTransactionId(res.data.order?.transactionId);
      setPaymentStatus(res.data.order?.status);
      console.log(res.data);
    });
  }, [refund]);

  useEffect(() => {
    axios.get(`/api/dashboard/users/${userId}`).then((res) => {
      setCustomer(res.data);
    });
  }, [userId]);

  // if (!product) {
  //   return <div>Loading...</div>
  // }
  // else

  const handleCheckStatus = () => {
    console.log(orderId)
    axios.get(`/api/dashboard/orders/${orderId}`).then((res) => {
      setTransactionId(res.data.order?.transactionId);
      // console.log(res.data);
    });
    axios
      .patch(`/api/payment/check-status`, {
        id: transactionId,
      })
      .then((res) => {
        console.log(res.data);
        setPaymentStatus(res.data.message);
        setTransId(res.data.transId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ml-80 mt-2">
      <div className="grid grid-cols-5 space-x-6">
        {/* Shipping info stepper */}
        <div className="col-span-2">
          <div>
            <h1 className="font-bold text-xl text-yellow-600">
              Refund request
            </h1>
            <div className="space-y-2">
              <p className="font-medium">Customer's Reason: </p>
              <Textarea
                value={refund?.reason}
                className="w-full"
                disabled={true}
              />
              <p className="font-bold text-xl text-yellow-600 pt-8">
                Response:{" "}
              </p>
              <Label>Refund status: </Label>
              <Textarea
                value={refundStatus}
                className="w-full"
                onChange={(e) => setRefundStatus(e.target.value)}
              />
              <p className="font-medium">Refund Amount: </p>
              <Input
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
              />
            </div>
            {transId ? (
              <Button
                onClick={() => {
                  axios
                    .patch(`/api/dashboard/refunds`, {
                      description: refundStatus,
                      amount: refundAmount,
                      transId: transId,
                    })
                    .then((res) => {
                      console.log(res.data);
                      setRefundStatus("");
                      setRefundAmount(0);
                    });
                }}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Send response
              </Button>
            ) : (
              <Button
                onClick={() => {
                  alert("Please check status first");
                }}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Send response
              </Button>
            )}
          </div>
          {/* <div className="my-4">
            <Button
              className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setIsEnableUpdate(!isEnableUpdate);

                if (isEnableUpdate) {
                  if (location === "" || status === "") {
                    alert(
                      "Please try again and fill in the location and status"
                    );
                    return;
                  }
                  axios
                    .patch(`/api/dashboard/orders/${id}`, {
                      location: location,
                      status: status,
                    })
                    .then((res) => {
                      console.log(res.data);
                      setLocation("");
                      setStatus("");
                    });
                }
              }}
            >
              {isEnableUpdate ? "Save changes" : "Update location"}
            </Button>
            <div className="space-y-2">
              <Input
                className=""
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={!isEnableUpdate}
              />
              <Select
                disabled={!isEnableUpdate}
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">placed</SelectItem>
                    <SelectItem value="banana">shipping</SelectItem>
                    <SelectItem value="blueberry">received</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div> */}
          {/*location stepper */}
        </div>

        <div className="col-span-3">
          <div className="flex flex-col w-full">
            <h1 className="font-bold text-xl text-yellow-600">ORDER #{id}</h1>
            <div className="mt-2 flex flex-col">
              <div className="flex space-x-20">
                <div className="flex flex-col">
                  <p className="font-medium">
                    Customer's name:{" "}
                    <span className="font-light">
                      {order?.address.receiverName}
                    </span>
                  </p>

                  <p className="font-medium">
                    Phone Number:{" "}
                    <span className="font-light">
                      {order?.address.phoneNumber}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col">
                  <p>
                    Ordered Date:{" "}
                    <span>
                      {new Date(order?.order.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Total:{" "}
                    <span className="text-yellow-800">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order?.order.subtotal)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-col ">
              <div className="flex  space-x-20">
                <div className="flex flex-col">
                  <p className="font-semibold">Payment Information</p>
                  <p>{order?.createdAt}</p>
                  <p className="">
                    Payment Method: {order?.order.paymentMethod}
                  </p>
                  <p className="text-lg font-semibold mt-2">
                    Payment Status: {paymentStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleCheckStatus}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Check Status
            </Button>
          </div>
          {/* Products */}
          {order?.order.items?.map((item: any) => (
            <a
              href={`/dashboard/products/details/${item.id}`}
              className="flex mt-8 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {/* <Image
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src="/docs/images/blog/image-4.jpg"
                alt=""
                loader={({ src }) => src}
              ></Image> */}

              <div className="flex flex-col justify-between p-2 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Price:{" "}
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {" "}
                  Quantity: {item.quantity}
                </p>
              </div>
            </a>
          ))}
          <ol className="mt-8 relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {order?.order?.shippingInfo.map((item: any, index: number) => {
              if (index === order?.order?.shippingInfo.length - 1) {
                return (
                  <StepperActive
                    location={item.location}
                    updatedAt={item.updatedAt}
                    status={item.status}
                  />
                );
              } else {
                return (
                  <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <StepperDeactive
                      location={item.location}
                      updatedAt={item.updatedAt}
                      status={item.status}
                    />
                  </ol>
                );
              }
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RefundDetailPage;
