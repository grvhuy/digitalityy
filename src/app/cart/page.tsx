"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addToCart,
  clearCart,
  removeFromCart,
  selectCartItems,
} from "@/lib/features/cartSlice";
import { AppDispatch } from "@/lib/store";
import axios from "axios";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch: AppDispatch = useDispatch();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: session } = useSession();
  const [user, setUser] = useState<any>({});
  const [userId, setUserId] = useState<string>("");

  const [products, setProducts] = useState<any[]>([]); // Mảng chứa các sản phẩm trong giỏ hàng

  const [quantity, setQuantity] = useState<number[]>([]);
  const [totalProduct, setTotalProduct] = useState<number[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  useEffect(() => {
    dispatch(clearCart());
  }, [])

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

  const handleCartRedux = () => {};

  const handleIncrement = async (index: number) => {
    if (quantity[index] === 1) return;
    dispatch(addToCart({
      _id: products[index].product._id,
      name: products[index].product.name,
      category: products[index].product.category,
      amount: quantity[index] + 1,
    }))
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
    });
  };

  const handleDecrement = async (index: number) => {
    if (quantity[index] === 1) return;
    dispatch(addToCart({
      _id: products[index].product._id,
      name: products[index].product.name,
      category: products[index].product.category,
      amount: quantity[index] - 1,
    }))
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
    });
  };

  const handleCheckout = async () => {
    router.push("/checkout");
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col">
        <section className="mt-8 ml-12">
          <h1 className="font-bold text-3xl">My Cart</h1>
        </section>

        <section className="mx-20 mb-10 mt-4">
          <div className="grid grid-cols-7 p-4 items-center bg-white shadow-sm">
            <h1 className="col-span-3 mx-2">Product</h1>
            <h1 className="self-center">Unit Price</h1>
            <h1 className="">Quantity</h1>
            <h1 className="font-semibold">Total</h1>
          </div>
        </section>

        {products.length === 0 ? (
          <div className="grid grid-cols-7 p-4 items-center bg-white shadow-sm">
            {/* Them UI loading */}
          </div>
        ) : (
          <section>
            {products.map((product: any, index: number) => (
              <div key={index} className="mx-20">
                <div className="grid grid-cols-7 p-4 items-center bg-white shadow-sm">
                  <div className="flex items-center">
                    <Checkbox
                      onCheckedChange={() => {
                        // Neu da check thi xoa khoi cartItems nguoc lai thi them vao
                        if (cartItems.find((item) => item._id === product.product._id)) {
                          dispatch(removeFromCart({ id: product.product._id }));
                        } else {
                          dispatch(addToCart({
                            _id: product.product._id,
                            name: product.product.name,
                            category: product.product.category,
                            amount: quantity[index],
                          }));
                        }
                      }}
                    id="terms" />
                    <img
                      src={product.product.images[0]}
                      width={120}
                      height={120}
                      alt="product"
                    />
                  </div>
                  <h1 className="col-span-2 mx-4 font-semibold">
                    {product.product.name}
                  </h1>
                  <h1 className="self-center text-red-400">
                    ${product.product.price}
                  </h1>
                  <div className="">
                    <div className="flex w-24 justify-between items-center border border-gray-500 ">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="border-r border-gray-500  px-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
                      >
                        <MinusIcon size={16} />
                      </button>
                      {/* <span className="">{product.quantity}</span> */}
                      <input
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
                  <h1 className="font-semibold">${totalProduct[index]}</h1>
                  <Button className="ml-4" variant="ghost">
                    <FiTrash2 size={24} />
                  </Button>
                </div>
              </div>
            ))}
          </section>
        )}
        {/* <section className="mx-20">
          <div className="flex w-full">
            <div>
              <div className="grid grid-cols-7 p-4 items-center bg-white shadow-sm">
                <img
                  src="https://grvhuy-digitality.s3.ap-southeast-2.amazonaws.com/1711726047842-Ban-phim-Corsair-K68-Full-size-Cherry-MX-RedRGB-nguyenvu.store-3-1536x1112.png"
                  width={120}
                  height={120}
                  alt="product"
                />
                <h1 className="col-span-2 mx-4">
                  Laptop Asus Vivobook Go 15 E1504FA R5 7520U (NJ776W)
                </h1>
                <h1 className="self-center">$100.00</h1>
                <div className="">
                  <div className="flex w-24 justify-between items-center border border-gray-500 border-spacing-1">
                    <button className="border-r border-gray-500  pr-2 mx-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
                      <MinusIcon size={16} />
                    </button>
                    <span className="">1</span>
                    <button className="border-l border-gray-500  pl-2 mx-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
                      <PlusIcon size={16} />
                    </button>
                  </div>
                </div>
                <h1 className="font-semibold">Unit Price x Qty</h1>
                <Button className="ml-4" variant="ghost">
                  <FiTrash2 size={24} />
                </Button>
              </div>              
            </div>
          </div>
        </section> */}
      </div>

      {/* // Cart Summary */}
      <div className="sticky mr-10 w-1/2  mt-14 ">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col bg-white shadow-sm border p-4 space-y-4">
            <h1 className="font-bold text-2xl">Cart Summary</h1>
            <div className="flex space-x-4 ">
              <h1 className="font-semibold">Subtotal</h1>
              {products.length > 0 && (
                <h1>
                  $
                  {products.reduce(
                    (acc, cur) => acc + cur.product.price * cur.quantity,
                    0
                  )}
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
    </div>
  );
};

export default CartPage;
