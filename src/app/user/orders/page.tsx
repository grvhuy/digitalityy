"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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
import Footer from "@/components/footer/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@nextui-org/input";
import { DialogClose } from "@radix-ui/react-dialog";

const OrdersHistory = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>({});
  const [userId, setUserId] = useState<string>("");
  const [orders, setOrders] = useState<any[]>([]);
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    setUser(session?.user);
    const userEmail = session?.user?.email;
    console.log(userEmail);
    // Lay userId tu userEmail
    if (userEmail) {
      axios.get(`/api/dashboard/users/${userEmail}`).then((res) => {
        setUserId(res.data._id);
      });
    }

    if (userId && orders.length === 0) {
      axios.get(`/api/orders/${userId}`).then((res) => {
        setOrders(res.data.orders);
        console.log(res.data.orders);
      });
    }

    // axios.get(`/api/orders/${userId}`).then((res) => {
    //   console.log(res.data);
    // });
    // Lay dia chi tu userId
  }, [session, userId]);

  return (
    <div className="bg-[#f5f5f5] h-full p-20 mb-[20rem]">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Orders History</h1>
          {/* filter */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup className="">
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="receive">To receive</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-sm py-2 px-4 my-8">
              <div className="flex justify-between items-center">
                <h1 className="font-extrabold">
                  ORDER ID: #
                  <Link
                    className="text-gray-700 hover:text-yellow-700"
                    href={`/user/orders/${order._id}`}
                  >
                    {order._id}
                  </Link>
                </h1>
                <Separator className="w-1/2" />
                <h1 className="italic text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h1>
                {order.status === "pending" ? (
                  <Button className="bg-[#f5f5f5] text-green-500 px-4 py-2 rounded-md uppercase">
                    {order.status}
                  </Button>
                ) : (
                  <Button className="bg-[#f5f5f5] text-orange-400-500 px-4 py-2 rounded-md uppercase">
                    {order.status}
                  </Button>
                )}
              </div>
              {order.items.map((product: any) => (
                <div key={product._id} className="flex items-center">
                  <Image
                    alt="product"
                    src={product.photo}
                    width={100}
                    height={100}
                    loader={({ src }) => src}
                  />
                  <div className="flex flex-col ml-4">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <div className="flex flex-col space-y-1 mt-2">
                      <h1 className="text-foreground text-gray-400">
                        {" "}
                        Quantity: {product.amount}
                      </h1>
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
              <Separator className="mt-2" />
              <div className="flex w-full justify-end bg-[#fffefb]">
                <div className="">
                  <h1 className="text-lg font-semibold mt-4">
                    Total:{" "}
                    <span className="text-yellow-500 font-medium">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.subtotal)}
                    </span>
                  </h1>
                  <div className="flex">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="text-black hover:text-white bg-red-400 px-4 py-2 rounded-md uppercase mt-4 mx-2">
                          Request for Refund
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Refund Order</DialogTitle>
                          <DialogDescription>
                            Order #{order._id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Textarea
                              id="reason"
                              placeholder="Let us know your reason for refund"
                              className="col-span-4"
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={async () => {
                                await axios.post("/api/dashboard/refunds", {
                                  orderId: order._id,
                                  reason: reason,
                                });
                              }}
                              // toast
                              className="text-black hover:text-white bg-[#facc15] px-4 py-2 rounded-md uppercase"
                            >
                              Submit
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button className="text-black hover:text-white bg-red-400 px-4 py-2 rounded-md uppercase">
                              Cancel
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button className="text-black hover:text-white bg-[#facc15] px-4 py-2 rounded-md uppercase mt-4">
                      View order
                    </Button>
                    {/* refund */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersHistory;
