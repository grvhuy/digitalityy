// "use server";

// import { revalidatePath } from "next/cache";

// import { error } from "console";
// import connectToDB from "../mongoose";
// import Product from "../models/product.model";

// interface Params {
//   name: string;
//   description: string;
//   productSpecs: {};
//   path: string;
// }

// export async function createProduct({ name, description, productSpecs, path }: Params) {
//   try {
//     connectToDB();
  
//     const product = await Product.create({name, description, productSpecs});


//     revalidatePath(path);

//   } catch(error: any) {
//     throw new Error(`Error creating : ${error.message}`)
//   }


// }
