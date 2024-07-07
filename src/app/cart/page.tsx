"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addToCart,
  addToCheckout,
  clearCart,
  removeFromCart,
  removeFromCheckout,
  selectCartItems,
  selectCheckoutItems,
  increment,
  decrement,
} from "@/lib/features/cartSlice";
import { AppDispatch } from "@/lib/store";
import { image } from "@nextui-org/theme";
import axios from "axios";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  // const checkoutItems = useSelector(selectCheckoutItems);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  const [user, setUser] = useState<any>({});
  const [userId, setUserId] = useState<string>("");

  const [products, setProducts] = useState<any[]>([]); // Mảng chứa các sản phẩm trong giỏ hàng

  const [quantity, setQuantity] = useState<number[]>([]);
  const [totalProduct, setTotalProduct] = useState<number[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0); // Tong tien cac san pham duoc checkbox

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  //lay thong tin user cua gio hang
  useEffect(() => {
    setUser(session?.user);
    const userEmail = session?.user?.email;
    axios.get(`/api/dashboard/users/${userEmail}`).then((res) => {
      if (res.data) setUserId(res.data._id);
    });
    // if (userId) {
    //   axios.get("/api/cart/" + userId).then((res) => {
    //     if (res.data) {
    //       setProducts(res.data.products);
    //       // setCartId(res.data._id)
    //     }
    //   });
    // }
  }, [session]);

  useEffect(() => {
    //Neu co userId thi lay thong tin gio hang
    if (userId) {
      axios.get("/api/cart/" + userId).then((res) => {
        if (res.data) {
          setProducts(res.data.products);
          setQuantity(
            res.data.products.map((product: any) => product.quantity)
          );
          setTotalProduct(
            res.data.products.map(
              (product: any) => product.product.price * product.quantity
            )
          );
        }
      });
    }
  }, [userId]);

  useEffect(() => {
    // console.log(selectedProducts);
    console.log(cartItems);
  }, [cartItems]);

  const handleIncrement = async (index: number) => {
    dispatch(increment({ id: products[index].product._id }));

    if (cartItems.find((items) => items._id === products[index].product._id)) {
      setSubtotal(subtotal + products[index].product.price);
    }

    const newQuantity = [...quantity];
    newQuantity[index] += 1;
    setQuantity(newQuantity);
    setTotalProduct(
      products.map(
        (product: any, i: number) => product.product.price * newQuantity[i]
      )
    );
    await axios.put("/api/cart", {
      userId,
      productId: products[index].product._id,
      quantity: newQuantity[index],
      price: products[index].product.price,
      image: products[index].product.images[0],
      variant: products[index].product.variant,
    });
  };

  const handleDecrement = async (index: number) => {
    if (quantity[index] === 1) return;
    dispatch(decrement({ id: products[index].product._id }));

    if (cartItems.find((item) => item._id === products[index].product._id)) {
      setSubtotal(subtotal - products[index].product.price);
    }

    const newQuantity = [...quantity];
    newQuantity[index] -= 1;
    setQuantity(newQuantity);
    setTotalProduct(
      products.map(
        (product: any, i: number) => product.product.price * newQuantity[i]
      )
    );
    await axios.put("/api/cart", {
      userId,
      productId: products[index].product._id,
      quantity: newQuantity[index],
      price: products[index].product.price,
      image: products[index].product.images[0],
    });
  };

  const handleQuantityInput = async (e: any, index: number) => {
    console.log(e.target.value);
    if (e.target.value < 0) return;

    const newQuantity = [...quantity];
    newQuantity[index] = e.target.value;
    setQuantity(newQuantity);
    setQuantity(
      products.map(
        (product: any, i: number) => product.product.price * newQuantity[i]
      )
    );
    await axios.put("/api/cart", {
      userId,
      productId: products[index].product._id,
      quantity: newQuantity[index],
      price: products[index].product.price,
      image: products[index].product.images[0],
    });
  };

  const handleCheckout = async () => {
    router.push("/checkout");
  };

  return (
    <div className="flex h-screen my-12">
      <div className="flex flex-col">
        <section className="mt-8 ml-12">
          <h1 className="font-bold text-3xl">My Cart</h1>
        </section>

        <section className="mx-20 mb-10 mt-4 min-w-[42rem]">
          <div className="grid grid-cols-7 p-4 items-center bg-white shadow-sm">
            <h1 className="col-span-3 mx-2">Product</h1>
            <h1 className="self-center">Unit Price</h1>
            <h1 className="">Quantity</h1>
            <h1 className="font-semibold">Total</h1>
          </div>
        </section>

        {(products.length === 0) ? (
          <div className="flex items-center justify-center w-full">
            {/* Them UI loading */}
            <div className="flex items-center justify-center">
              <Image
                alt=""
                // src lay trong public/images
                src={"/images/shopping.png"}
                width={200}
                height={200}
              />
              
              <h1 className="text-2xl font-semibold">Your cart is empty</h1>
              <Link href="/categories">
                <Button className="ml-4">Go Shopping</Button>
              </Link>
            </div>
          </div>
        ) : (
          <section>
            {products.length > 0 &&
              products.map((product: any, index: number) => (
                <div key={index} className="mx-20">
                  <div className="grid grid-cols-7 p-4 items-center bg-white shadow-sm">
                    <div className="flex items-center">
                      <Checkbox
                        onCheckedChange={() => {
                          if (
                            cartItems.find(
                              (item) => item._id === product.product._id
                            )
                          ) {
                            dispatch(
                              removeFromCart({ id: product.product._id })
                            );
                            setSubtotal(subtotal - totalProduct[index]);
                          } else {
                            dispatch(
                              addToCart({
                                _id: product.product._id,
                                name: product.product.name,
                                category: product.product.category,
                                amount: quantity[index],
                                price: product.product.price,
                                image: product.product.images[0],
                                variant: product.product.variant,
                              })
                            );
                            setSubtotal(subtotal + totalProduct[index]);
                          }
                        }}
                        id="terms"
                      />
                      <Image
                        src={product.product.images[0]}
                        loader={({ src }) => src}
                        width={120}
                        height={120}
                        alt="product"
                      />
                    </div>
                    <h1 className="col-span-2 mx-4 font-semibold">
                      {product.product.name}
                    </h1>
                    <h1 className="self-center text-red-400">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.product.price)} 
                    </h1>
                    <div className="">
                      <div className="flex w-24 justify-between items-center border border-gray-500 ">
                        <button
                          onClick={() => handleDecrement(index)}
                          className="border-r border-gray-500 px-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
                        >
                          <MinusIcon size={16} />
                        </button>
                        {/* <span className="">{product.quantity}</span> */}
                        <input
                          disabled
                          className="w-8 text-center"
                          type="text"
                          value={quantity[index]}
                          onChange={() => {}}
                        />
                        <button
                          onClick={() => {
                            handleIncrement(index);
                          }}
                          className="border-l border-gray-500 px-2 pr-3 opacity-50 hover:opacity-100 transition-opacity duration-300"
                        >
                          <PlusIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <h1 className="font-semibold">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalProduct[index] || 0)}
                    </h1>
                    <Button
                      onClick={() => {
                        dispatch(removeFromCart({ id: product.product._id }));
                        if (
                          cartItems.find(
                            (item) => item._id === product.product._id
                          )
                        ) {
                          setSubtotal(subtotal - totalProduct[index]);
                        }
                        axios.delete(`/api/cart/${userId}`, {
                          data: {
                            userId,
                            productId: product.product._id,
                          },
                        });
                        window.location.reload();
                      }}
                      className="ml-4"
                      variant="ghost"
                    >
                      <FiTrash2 size={24} />
                    </Button>
                  </div>
                </div>
              ))}
            {products.length === 0 && (
              <div className="grid grid-cols-7 p-4 items-center bg-white shadow-sm">
                {/* Them UI loading */}
              </div>
            )}
          </section>
        )}
      </div>

      {/* // Cart Summary */}
      {
        products.length > 0 && (
          <div className="sticky mr-10 w-1/3  mt-14 ">
            <div className="flex flex-col justify-center">
              <div className="flex flex-col bg-white shadow-sm border p-4 space-y-4">
                <h1 className="font-bold text-2xl">Cart Summary</h1>
                <div className="flex space-x-4 ">
                  <h1 className="font-semibold">Subtotal</h1>
                  {products.length > 0 && (
                    <h1>
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(subtotal || 0)}
                    </h1>
                  )}
                </div>
                {/* <div className="flex space-x-4 ">
                  <h1 className="font-semibold">Shipping</h1>
                  <h1>${shipping}</h1>
                </div> */}
                {/* <div className="flex space-x-4 ">
                  <h1 className="font-semibold">Total</h1>
                  <h1>$ {subTotal + shipping}</h1>
                </div> */}
                <Button onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CartPage;
