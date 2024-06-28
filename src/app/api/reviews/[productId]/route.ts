import Review from "@/lib/models/review.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  connectToDB();
  const productId = req.url.split("/").pop();
  const { comment, rating, userId } = await req.json();
  const review = Review.create({
    comment,
    rating,
    product: productId,
    user: userId,
  });
  return NextResponse.json({ review });
};

export const GET = async (req: Request) => {
  await connectToDB();

  const productId = req.url.split("/").pop();
  if (!productId) {
    return NextResponse.json(
      { error: "Product ID not provided" },
      { status: 400 }
    );
  }

  const reviews = await Review.find({ product: productId })
    .populate("user")
    .sort({ createdAt: 1 }); // Sắp xếp theo createdAt tăng dần (cũ nhất trước, mới nhất sau)

  // Tạo mảng mới để chứa các review theo thứ tự ngược
  const reversedReviews = [];
  for (let i = reviews.length - 1; i >= 0; i--) {
    reversedReviews.push(reviews[i]);
  }

  return NextResponse.json(reversedReviews);
};

export const DELETE = async (req: Request) => {
  await connectToDB();

  const  reviewId  = await req.url.split("/").pop();
  await Review.findByIdAndDelete(reviewId);
  return NextResponse.json({
    reviewId,
  });
}