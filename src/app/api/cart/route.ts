import Cart from "@/lib/models/cart.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  connectToDB();
  const values = await req.json();
  const cart = await Cart.findOne({ user: values.userId })
  if (cart) {
    const product = cart.products.find((p: any) => p.product == values.product.productId);
    if (product) {
      product.quantity += values.product.quantity;
    } else {
      cart.products.push({
        product: values.product.productId,
        quantity: values.product.quantity,
      });
    }
    await cart.save();
  } else {
    const newCart = new Cart({
      user: values.userId,
      products: [values.product],
    });
    await newCart.save();
  }
  console.log(values)

  return NextResponse.json(values.product.productId);
};

export const PUT = async (req: Request) => {
  // Cap nhat so luong cua san pham trong gio hang
  connectToDB();
  const values = await req.json();
  const { userId, productId, quantity } = values;
  const cart = await Cart.findOne({ user: userId });
  const product = cart.products.find((p: any) => p.product == productId);
  product.quantity = quantity;
  await cart.save();

  return NextResponse.json({ message: "Update quantity success!" });
}

