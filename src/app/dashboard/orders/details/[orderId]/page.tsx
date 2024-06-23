"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@nextui-org/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepperActive } from "@/components/Stepper";
import { StepperDeactive } from "@/components/StepperDeactive";

const OrderDetailPage = () => {
  const id = usePathname().split("/").pop();
  const [order, setOrder] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [isEnableUpdate, setIsEnableUpdate] = useState(false);
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    axios.get(`/api/dashboard/orders/${id}`).then((res) => {
      setOrder(res.data);
      setUserId(res.data.userId);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/dashboard/users/${userId}`).then((res) => {
      setCustomer(res.data);
    });
  }, [userId]);

  // if (!product) {
  //   return <div>Loading...</div>
  // }
  // else
  return (
    <div className="ml-80 mt-2">
      <div className="grid grid-cols-3 space-x-6">
        {/* Shipping info stepper */}
        <div className="col-span-1">
          <div className="my-4">
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
          </div>
          {/*location stepper */}

          <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {order?.order?.shippingInfo.map((item: any, index: number) => {
              if (index === order?.order?.shippingInfo.length - 1) {
                return (
                  <StepperActive location={item.location} updatedAt={item.updatedAt} status={item.status} />
                );
              } else {
                return (
                  <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <StepperDeactive location={item.location} updatedAt={item.updatedAt} status={item.status} />
                  </ol>
                );
              }
            })}
          </ol>
        </div>

        <div className="col-span-2">
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
                  <p className="">Payment Status: {order?.order.status}</p>
                  <p className="">Payment ID: {order?.order.paymentId}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
