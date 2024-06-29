"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { selectCartItems } from "@/lib/features/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [defaultAddress, setDefaultAddress] = useState<any>();
  const [userAddress, setUserAddress] = useState<any>();

  const { data: session } = useSession();
  const [user, setUser] = useState<any>({});
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    setUser(session?.user);
    const userEmail = session?.user?.email;
    axios.get(`/api/dashboard/users/${userEmail}`).then((res) => {
      if (res.data) {
        setUserId(res.data._id);
        setDefaultAddress(res.data.defaultAddress);
        // console.log(res.data.defaultAddress)
      }
    });

    // Lay dia chi tu userId
    if (userId) {
      axios.get(`/api/address/${userId}`).then((res) => {
        res.data.forEach((address: any) => {
          if (address._id === defaultAddress) {
            setUserAddress(address);
            console.log("user address:", address);
          }
        });
      });
    }
  }, [session, userId]);

  useEffect(() => {
    console.log("cart items:", cartItems);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    axios.post("/api/payment/e-wallet", {
      amount: cartItems.reduce((acc, item) => { return acc + (item.price * item.amount) }, 0),
      // orderInfo: "MOMO",
      redirectUrl: "https/localhost:3000/checkout/success",
      ipnUrl: "https/localhost:3000/checkout/success",
      requestType: "MOMO",
      lang: "en",
      userInfo: {
        userId: userId,
        email: user.email,
        phoneNumber: user.phoneNumber,
      
      },
      deliveryInfo: {
        deliveryAddress: userAddress,
        deliveryFee: 30000,
      },
      items: cartItems.map((item) => {
        return {
          name: item.name,
          price: item.price,
          quantity: item.amount,
        };
      }),
    });
  }

  return (
    <>
      <div className="grid grid-cols-2">
        {/* Payment information */}
        <section className="flex flex-col">
          <div className="bg-yellow-400 rounded-md mt-8 ml-10 p-2 shadow-md w-fit">
            <h1 className="font-semibold text-xl">Checkout</h1>
          </div>

          {/* Address Card */}
          <section className="mt-4">
            {/* address */}
            <div className="mx-12 border-1 border-transparent rounded-lg bg-gradient-to-b from-blue-500 to-green-500">
              <div className=" flex flex-col justify-center w-full p-4 bg-white dark:bg-gray-900 rounded-md shadow-md">
                <h1 className="font-bold text-blue-600 text-xl mb-4">
                  Address
                </h1>
                <div className="flex items-center justify-between w-full">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {/* {address.receiverName} */} Username
                      <span className="ml-2 text-gray-500 font-normal text-sm">
                        {/* {address.phoneNumber} */} Phone
                      </span>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {/* {address.addressLine}, {address.ward}, {address.district},{" "}
                    {address.city} */}
                      Address details
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2 items-end">
                    <Button className="" variant="outline">
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery method */}
          <div className="my-8 mx-12 text-medium font-semibold">
            <h2>Delivery Method</h2>
            <RadioGroup
              defaultValue="comfortable"
              className="border-1 rounded-md"
            >
              <div className="px-4 pb-2 pt-4 flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label className="text-gray-500" htmlFor="r1">
                  Normal shipping
                </Label>
              </div>
              <Separator />
              <div className="px-4 py-2 flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label className="text-gray-500" htmlFor="r2">
                  Fast shipping
                </Label>
              </div>
              <Separator />
              <div className="px-4 pt-2 pb-4 flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label className="text-gray-500" htmlFor="r3">
                  Same-day shipping
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment */}
          <div className="mx-12 text-medium font-semibold">
            <h2>Payment method</h2>
            <RadioGroup
              defaultValue="comfortable"
              className="border-1 rounded-md"
            >
              <div className="px-4 pb-2 pt-4 flex items-center space-x-4">
                <RadioGroupItem value="default" id="r4" />
                <Label className="text-gray-500" htmlFor="r4">
                  Momo E-wallet
                </Label>
                {/* The Image voi file svg /public/momo_icon_square_pinkbg.svg */}
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 60 60"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>momo_icon_square_pinkbg</title>
                  <g
                    id="5.-Kiểm-tra-giao-dịch"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="momo_icon_square_pinkbg">
                      <path
                        d="M55.9459459,0 L4.05405405,0 C2.56756757,0 1.21621622,0 0,0 L0,55.9459459 C0,57.4324324 0,58.7837838 0,60 L60,60 C60,58.7837838 60,57.4324324 60,55.9459459 L60,0 C58.7837838,0 57.4324324,0 55.9459459,0 Z"
                        id="Path"
                      ></path>
                      <g
                        id="Group"
                        transform="translate(4.000000, 5.500000)"
                        fill="#A50064"
                        fillRule="nonzero"
                      >
                        <path
                          d="M40.9111892,22.0954907 C47.0426493,22.0954907 52,17.1564987 52,11.0477454 C52,4.93899204 47.0426493,0 40.9111892,0 C34.7797291,0 29.8223783,4.93899204 29.8223783,11.0477454 C29.8223783,17.1564987 34.7797291,22.0954907 40.9111892,22.0954907 Z M40.9111892,6.34270557 C43.5203211,6.34270557 45.633718,8.44827586 45.633718,11.0477454 C45.633718,13.6472149 43.5203211,15.7527851 40.9111892,15.7527851 C38.3020572,15.7527851 36.1886603,13.6472149 36.1886603,11.0477454 C36.1886603,8.44827586 38.3020572,6.34270557 40.9111892,6.34270557 Z"
                          id="Shape"
                        ></path>
                        <path
                          d="M40.9111892,26.8785146 C34.7797291,26.8785146 29.8223783,31.8175066 29.8223783,37.9262599 C29.8223783,44.0350133 34.7797291,48.9740053 40.9111892,48.9740053 C47.0426493,48.9740053 52,44.0350133 52,37.9262599 C52,31.8175066 47.0426493,26.8785146 40.9111892,26.8785146 Z M40.9111892,42.6312997 C38.3020572,42.6312997 36.1886603,40.5257294 36.1886603,37.9262599 C36.1886603,35.3267905 38.3020572,33.2212202 40.9111892,33.2212202 C43.5203211,33.2212202 45.633718,35.3267905 45.633718,37.9262599 C45.633718,40.5257294 43.5203211,42.6312997 40.9111892,42.6312997 Z"
                          id="Shape"
                        ></path>
                        <path
                          d="M18.3161064,26.8785146 C16.4375314,26.8785146 14.7155043,27.5023873 13.3326643,28.5421751 C11.9498244,27.5023873 10.201706,26.8785146 8.34922228,26.8785146 C3.75715003,26.8785146 0.0260913196,30.595756 0.0260913196,35.1708223 L0.0260913196,49 L6.39237331,49 L6.39237331,35.0928382 C6.39237331,34.0530504 7.22729553,33.2212202 8.27094832,33.2212202 C9.3146011,33.2212202 10.1495233,34.0530504 10.1495233,35.0928382 L10.1495233,48.9740053 L16.5158053,48.9740053 L16.5158053,35.0928382 C16.5158053,34.0530504 17.3507275,33.2212202 18.3943803,33.2212202 C19.4380331,33.2212202 20.2729553,34.0530504 20.2729553,35.0928382 L20.2729553,48.9740053 L26.613146,48.9740053 L26.613146,35.1448276 C26.613146,30.595756 22.9081786,26.8785146 18.3161064,26.8785146 Z"
                          id="Path"
                        ></path>
                        <path
                          d="M18.3161064,0 C16.4375314,0 14.7155043,0.623872679 13.3326643,1.66366048 C11.9498244,0.623872679 10.201706,0 8.34922228,0 C3.73105871,0 0,3.71724138 0,8.29230769 L0,22.0954907 L6.36628199,22.0954907 L6.36628199,8.21432361 C6.36628199,7.17453581 7.20120421,6.34270557 8.244857,6.34270557 C9.28850978,6.34270557 10.123432,7.17453581 10.123432,8.21432361 L10.123432,22.0954907 L16.489714,22.0954907 L16.489714,8.21432361 C16.489714,7.17453581 17.3246362,6.34270557 18.368289,6.34270557 C19.4119418,6.34270557 20.246864,7.17453581 20.246864,8.21432361 L20.246864,22.0954907 L26.613146,22.0954907 L26.613146,8.29230769 C26.613146,3.71724138 22.9081786,0 18.3161064,0 Z"
                          id="Path"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <Separator />
              <div className="px-4 py-2 flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r5" />
                <Label className="text-gray-500" htmlFor="r5">
                  ATM/Credit Card
                </Label>
              </div>
              <Separator />
              <div className="px-4 pt-2 pb-4 flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r6" />
                <Label className="text-gray-500" htmlFor="r6">
                  Cash on Delivery
                </Label>
              </div>
            </RadioGroup>
          </div>
        </section>

        {/* Products + summary */}
        <section className="my-12 pb-12">
          {/* Products Summary */}
          <div className="mx-20 mt-8">
            <div className="flex justify-between">
              <h1 className="font-bold text-lg">Summary</h1>
            </div>

            <ScrollArea className="max-h-96 w-full rounded-md border">
              {cartItems.map((items, index) => (
                <>
                  <div className="flex p-2">
                    <img
                      src={items.image}
                      alt="Product image"
                      width={100}
                      height={100}
                      className="mr-4"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex flex-col">
                        <h2 className="font-semibold">{items.name}</h2>
                        <h2 className="text-gray-500">Variant</h2>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h1 className="text-gray-500">
                          Quantity: {items.amount}
                        </h1>
                        <span className="font-bold mr-4">${items.price} </span>
                      </div>
                    </div>
                  </div>
                  {index !== cartItems.length - 1 && (
                    <Separator className="mt-2" />
                  )}
                </>
              ))}
            </ScrollArea>
          </div>
          {/* Discount */}
          <div className="ml-8 mr-32">
            <Input
              className="mt-4 mb-2 ml-12"
              placeholder="Discount code"
              type="text"
            />
            <Button
              className="ml-12 w-full transition-all duration-500 opacity-50 hover:opacity-100 font-mono"
              variant="default"
            >
              Apply
            </Button>
          </div>
          {/* Total */}
          <div className="mx-20 mt-4 mb-12">
            <div className="flex justify-between">
              <h1 className="font-bold text-lg">Total</h1>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex flex-col bg-white shadow-sm border rounded-md p-4 space-y-4">
                <div className="flex space-x-4 ">
                  <h1 className="font-semibold">Subtotal</h1>
                  <h1 className="font-semibold text-blue-500">
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item.price * item.amount,
                      0
                    )}
                  </h1>
                </div>
                <div className="flex space-x-4 ">
                  <h1 className="font-semibold">Shipping</h1>
                  <h1>Ship fee</h1>
                </div>
                <div className="flex space-x-4 ">
                  <h1 className="font-semibold">Total</h1>
                  <h1>$ total</h1>
                </div>
              </div>
              <Button className="mt-4" variant="default">
                Place Order
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutPage;
