import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return NextResponse.json("Get cart success!");
}

export const PUT = async (req: Request) => {
  // cap nhat so luong
  // connectToDB();
  // const values = await req.json();
  // const { userId, product } = values;
  // const cart = await Cart.findOne({ user: userId });

  // const index = cart.products.findIndex((p: any) => p.product == product.productId);
  // if (index === -1) {
  //   cart.products.push(product);
  // } else {
  //   cart.products[index].quantity += product.quantity;
  // }
  // await cart.save();

  return NextResponse.json("Update quantity success!");
  // return NextResponse.json(values)
}