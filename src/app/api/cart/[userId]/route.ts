import Cart from "@/lib/models/cart.model";
import Product from "@/lib/models/product.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  connectToDB();
  const userId = req.url.split("/").pop();
  const cart = await Cart.findOne({ user: userId })
    .populate({
      path: "products.product", // Đường dẫn đến trường 'product' trong mảng 'products'
      model: Product, 
      select: "name price images price quantity" 
    })
  return NextResponse.json(cart);
};

export const PUT = async (req: Request) => {
  // cap nhat so luong
  connectToDB();
  const values = await req.json();
  const { userId, product, price, image, quantity  } = values;
  const cart = await Cart.findOne({ user: userId });

  const index = cart.products.findIndex((p: any) => p.product == product.productId);
  if (index === -1) {
    cart.products.push({
      product: product.productId,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
      variant: values.variant
    });
  } else {
    cart.products[index].quantity += product.quantity;
  }

  
  await cart.save(
    
  );

  // return NextResponse.json("Update quantity success!");
  return NextResponse.json(cart)
}

export const DELETE = async (req: Request) => {
  connectToDB();
  const values = await req.json();
  const { userId, productId } = values;
  const cart = await Cart.findOne({ user: userId });
  cart.products = cart.products.filter((p: any) => p.product != productId);
  await cart.save();

  return NextResponse.json({ message: "Delete product success!" });
}