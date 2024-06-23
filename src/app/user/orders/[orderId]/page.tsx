"use client";
import { StepperActive } from "@/components/Stepper";
import { StepperDeactive } from "@/components/StepperDeactive";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerOrderPage = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);

  const orderId = usePathname().split("/").pop();

  useEffect(() => {
    axios.get(`/api/dashboard/orders/${orderId}`).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="bg-[#f5f5f5] h-full min-h-screen p-20">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">DETAILS ORDER #{orderId}</h1>
          {/* Order status stepper */}
          <ol className="flex items-center w-full">
            <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
              <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
            </li>
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                <svg
                  className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                </svg>
              </span>
            </li>
            <li className="flex items-center w-full">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                <svg
                  className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                </svg>
              </span>
            </li>
          </ol>
        </div>
        {/* Address status stepper */}
        {/* gradient line */}
        <div className="mt-12 mb-4 w-full h-0.5 bg-gradient-to-r from-blue-600 to-red-500"></div>
        <div className="grid grid-cols-3 space-x-6">
          <h1 className="text-gray-500 text-sm">
            Delivery Address:
            <div className="flex flex-col">
              <span className="text-gray-700 font-semibold">
                {" "}
                {data?.address?.receiverName}
              </span>
              <span className="text-gray-700 ">
                {" "}
                {data?.address?.phoneNumber}
              </span>
              <span className="text-gray-700 ">
                {" "}
                {data?.address?.addressLine} - {data?.address?.ward} -{" "}
                {data?.address?.district} - {data?.address?.city}
              </span>
            </div>
          </h1>
          <div className="col-span-2">
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
              {data?.order?.shippingInfo.map((item: any, index: number) => {
                if (index === data?.order?.shippingInfo.length - 1) {
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

        {/* Products */}
        <Separator className="w-full my-8" />
        <div>
          {data?.order.items.map((product: any) => (
            <div key={product._id} className="flex items-center">
              <Image
                alt="product"
                src={product.photo}
                width={100}
                height={100}
                loader={({ src }) => src}
              />
              <div className="flex flex-col ml-4">
                <Link
                  href={`/products/${product.id}`}
                  className="text-xl font-bold"
                >
                  {product.name}
                </Link>
                <div className="flex flex-col space-y-1 mt-2">
                  <p className="text-foreground text-gray-400">
                    {" "}
                    Quantity: {product.quantity}
                  </p>
                  <span className="text-yellow-500 font-medium">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-end">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Mechandise subtotal
                  </th>
                  <td className="px-6 py-4">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(data?.order.subtotal)}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-end">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Discount
                  </th>
                  <td className="px-6 py-4">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(10000)}
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-end">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Shipping fee
                  </th>
                  <td className="px-6 py-4">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(40000)}
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-end">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total
                  </th>
                  <td className="px-6 py-4">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(data?.order.subtotal)}
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-end">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Payment Method
                  </th>
                  <td className="px-6 py-4 uppercase">
                    {data?.order.paymentMethod}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerOrderPage;
