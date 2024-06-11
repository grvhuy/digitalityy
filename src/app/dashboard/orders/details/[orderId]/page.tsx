"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@nextui-org/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const OrderDetailPage = () => {
  const id = usePathname().split("/").pop();
  const [order, setOrder] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
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
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-xl text-yellow-600">ORDER #{id}</h1>

        <div className="mt-2 flex flex-col">
          <div className="flex items-center space-x-20">
            <div className="flex flex-col">
              <p className="font-semibold">Customer</p>
              <p className="font-medium">
                Customer's name: <span className="font-light">{userId}</span>
              </p>

              <p className="font-medium">
                Phone Number: <span className="font-light">0123456789</span>
              </p>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold">Order Information</p>
              <p>{order?.createdAt}</p>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-col">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col">
              <p className="font-semibold">Payment Information</p>
              <p>{order?.createdAt}</p>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold">Notes</p>
              <Textarea className="w-96" />
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <a
        href="#"
        className="flex mt-8 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl    hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {/* <Image
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src="/docs/images/blog/image-4.jpg"
            alt=""
            loader={({ src }) => src}
          ></Image> */}
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </a>

      {order?.items?.map((item: any) => {})}
    </div>
  );
};

export default OrderDetailPage;
