import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load biến môi trường từ file .env
dotenv.config();

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB_NAME;
const client = new MongoClient(uri);

export async function GET(req: Request) {
  try {
    // Kết nối đến MongoDB
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection("products"); // Thay thế bằng tên collection của bạn

    // Lấy từ khóa từ query params (từ thanh search bar)
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("keyword") || "";
    const keywords = searchQuery.split(" ").filter((keyword) => keyword !== "");

    // Tạo biểu thức chính quy để tìm kiếm
    const regexKeywords = keywords
      .map((keyword) => `(?=.*${keyword})`)
      .join("");
    const regex = new RegExp(`${regexKeywords}`, "i");

    // Tìm kiếm sản phẩm theo các từ khóa trong tên sản phẩm
    const query = { name: { $regex: regex } }; // 'i' để không phân biệt chữ hoa chữ thường
    const products = await collection.find(query).toArray();

    // Trả về kết quả dưới dạng JSON
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Lỗi:", error);
    return new Response("Có lỗi xảy ra", { status: 500 });
  } finally {
    // Đóng kết nối đến MongoDB
    await client.close();
  }
}
