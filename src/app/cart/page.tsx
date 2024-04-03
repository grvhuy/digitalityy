"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const CartPage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>({});
  const [productId, setProductId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  
  // const [ shipping, setShipping ] = useState<number>(0)
  // const [ subTotal, setSubtotal ] = useState<number>(0)

  // const [ cartId, setCartId ] = useState<string>("") // Id cua gio hang
  const [products, setProducts] = useState<any[]>([]); // Mảng chứa các sản phẩm trong giỏ hàng
  // const [quantity, setQuantity] = useState<number>(0); // Số lượng sản phẩm trong giỏ hàng
  //mang chua so luong cua tung san pham
  const [quantity, setQuantity] = useState<number[]>([]); 
  const [ totalProduct, setTotalProduct ] = useState<number[]>([])

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
          setQuantity(res.data.products.map((product: any) => product.quantity)) 
          setTotalProduct(res.data.products.map((product: any) => product.product.price * product.quantity))   
        }
      });
    }
  }, [userId]);

  useEffect(() => {
    console.log(quantity)
  }, [quantity])


  const handleChangeCart = (e: any) => {
    //Tru so luong item trong gio hang
    // e.preventDefaut()
    console.log(e.target.value)
  }

  const  handleIncrement = async (index: number) => {
    const newQuantity = [...quantity]
    newQuantity[index] += 1
    setQuantity(newQuantity)
    setTotalProduct(products.map((product: any, i: number) => product.product.price * newQuantity[i]))
    await axios.put("/api/cart", {
      userId,
      productId: products[index].product._id,
      quantity: newQuantity[index]
    })
  }

  const handleDecrement = async (index: number) => {
    const newQuantity = [...quantity]
    newQuantity[index] -= 1
    setQuantity(newQuantity)
    setTotalProduct(products.map((product: any, i: number) => product.product.price * newQuantity[i]))
    await axios.put("/api/cart", {
      userId,
      productId: products[index].product._id,
      quantity: newQuantity[index]
    })
  }

  const handleQuantityInput = async (e: any, index: number) => {
    console.log(e.target.value)
    if (e.target.value < 0) return
    
    const newQuantity = [...quantity]
    newQuantity[index] = e.target.value
    setQuantity(newQuantity)
    setQuantity(products.map((product: any, i: number) => product.product.price * newQuantity[i]))
    await axios.put("/api/cart", {
      userId,
      productId: products[index].product._id,
      quantity: newQuantity[index]
    })
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col">
        <section className="">
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
                    <img
                      src={product.product.images[0]}
                      width={120}
                      height={120}
                      alt="product"
                    />
                    <h1 className="col-span-2 mx-4 font-semibold">{product.product.name}</h1>
                    <h1 className="self-center text-red-400">${product.product.price}</h1>
                    <div className="">
                      <div className="flex w-24 justify-between items-center border border-gray-500 ">
                        <button
                          onClick={() => handleDecrement(index)}
                          className="border-r border-gray-500  px-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
                          <MinusIcon size={16} />
                        </button>
                        {/* <span className="">{product.quantity}</span> */}
                        <input 
                          className="w-8 text-center"
                          type="text"
                          value={quantity[index]}
                          onChange={handleChangeCart} 
                        />
                        <button 
                          onClick={() => handleIncrement(index)}
                        className="border-l border-gray-500 px-2 pr-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
                          <PlusIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <h1 className="font-semibold">
                      ${totalProduct[index]}                      
                    </h1>
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
                  ${products.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
