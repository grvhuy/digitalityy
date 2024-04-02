"use server";


import Product from "../models/product.model";
import Category from "../models/category.model";
import { NextResponse } from "next/server";
import connectToDB from "../mongoose";

export async function getProductsByBrandname() {
  connectToDB()
  const products = await Product.find({

  })
  NextResponse.json(products)
  
}

// export type Product = {
//   id: string;
//   name: string;
//   category: string;
//   amount: string;
// };

// export async function getProductTableData() {
//   connectToDB();
//   const products = await Product.find({}).populate({
//     path: "category",
//     model: Category,
//     select: "name"
//   })

//   return products
// }

// // export async function createProduct({ name, description, productSpecs, path }: Params) {
// //   try {
// //     connectToDB();
// //     const product = await Product.create({name, description, productSpecs});


// //   } catch(error: any) {
// //     throw new Error(`Error creating : ${error.message}`)
// //   }


// // }
