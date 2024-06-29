import Product from "@/lib/models/product.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // Kết nối tới MongoDB
    await connectToDB();

    // Nhận dữ liệu từ yêu cầu
    const { categoryId, filterSpecs } = await req.json();

    // Tách điều kiện tìm kiếm cho brand
    const brandSpec = filterSpecs.find((spec: { attributeName: string }) => spec.attributeName === "Brand");
    const brandCondition = brandSpec ? { brand: new RegExp(brandSpec.attributeValue, "i") } : null;

    // Tạo điều kiện tìm kiếm cho các thông số khác
    const filterConditions = filterSpecs
      .filter((spec: { attributeName: string }) => spec.attributeName !== "Brand")
      .map((spec: { attributeName: string, attributeValue: string }) => ({
        productSpecs: {
          $elemMatch: {
            attributeName: spec.attributeName,
            attributeValue: new RegExp(spec.attributeValue, "i"),
          },
        },
      }));

    // Xây dựng truy vấn tìm kiếm
    const query: any = { category: categoryId };
    if (brandCondition) {
      filterConditions.push(brandCondition);
    }
    if (filterConditions.length > 0) {
      query.$and = filterConditions;
    }

    // Tìm sản phẩm
    const products = await Product.find(query);

    // Trả về kết quả tìm kiếm
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'An error occurred while processing the request.' }, { status: 500 });
  }
};