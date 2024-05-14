"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@nextui-org/input";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Review from "./Review";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const now = new Date();
  const TestArray = [
    {
      title: "Test title 1",
      name: "Test Name 1",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet risus feugiat in ante metus dictum at tempor. Id volutpat lacus laoreet non. Malesuada fames ac turpis egestas sed tempus urna et. Feugiat vivamus at augue eget arcu dictum varius duis. Porttitor massa id neque aliquam vestibulum morbi blandit. Gravida quis blandit turpis cursus in hac habitasse. Sed risus pretium quam vulputate. Volutpat est velit egestas dui id ornare arcu. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Pharetra convallis posuere morbi leo. Pellentesque habitant morbi tristique senectus et netus. Vitae auctor eu augue ut lectus arcu bibendum. Ultrices in iaculis nunc sed augue. Quam vulputate dignissim suspendisse in est ante. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Egestas diam in arcu cursus euismod quis viverra nibh cras.",
      rating: 3,
      date: now,
    },
    {
      title: "Test title 2",
      name: "Test Name 2",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus at ultrices mi tempus. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Tellus in hac habitasse platea. Ipsum nunc aliquet bibendum enim facilisis gravida. Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Ac feugiat sed lectus vestibulum mattis ullamcorper. Tincidunt praesent semper feugiat nibh. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Eu mi bibendum neque egestas congue. Dolor purus non enim praesent elementum facilisis leo. Nibh mauris cursus mattis molestie. Viverra suspendisse potenti nullam ac tortor vitae purus. Nulla facilisi nullam vehicula ipsum a arcu cursus.",
      rating: 4,
      date: now,
    },
    {
      title: "Test title 3",
      name: "Test Name 3",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet risus feugiat in ante metus dictum at tempor. Id volutpat lacus laoreet non. Malesuada fames ac turpis egestas sed tempus urna et. Feugiat vivamus at augue eget arcu dictum varius duis. Porttitor massa id neque aliquam vestibulum morbi blandit. Gravida quis blandit turpis cursus in hac habitasse. Sed risus pretium quam vulputate. Volutpat est velit egestas dui id ornare arcu. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Pharetra convallis posuere morbi leo. Pellentesque habitant morbi tristique senectus et netus. Vitae auctor eu augue ut lectus arcu bibendum. Ultrices in iaculis nunc sed augue. Quam vulputate dignissim suspendisse in est ante. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Egestas diam in arcu cursus euismod quis viverra nibh cras.",
      rating: 5,
      date: now,
    },
  ];

  const { data: session } = useSession();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
  // const images = ["/images/6.png", "/images/abcd.png", "/images/test-img.png"];
  const [product, setProduct] = useState<any[]>([]);
  const [productSpecs, setProductspecs] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  // Lay thong tin user
  useEffect(() => {
    const userEmail = session?.user?.email;
    axios.get(`/api/dashboard/users/${userEmail}`).then((response) => {
      const data = response.data;
      if (data) setUserId(data._id);
    });
  }, [session]);

  useEffect(() => {
    axios.get("/api/dashboard/products/" + params.productId).then((result) => {
      setProduct(result.data);
      setImages(result.data.images);
      setProductspecs(result.data.productSpecs);
      setPrice(result.data.price);

      // console.log(result.data);
      // console.log(result.data.productSpecs);
    });
  }, [params.productId]);

  const handleAddtoCart = async () => {
    //Neu chua dang nhap thi ve page login
    if (!session) {
      window.location.href = "/login";
    }
    if (userId) {
      try {
        axios.put(`/api/cart/${userId}`, {
          userId: userId,
          product: {
            productId: params.productId,
            quantity: 1,
            price,
            image: images[0],
          },
        }).then((response) => {
          console.log(response);
        }
        );
      } catch (error) {
        console.log(error);
      }
      
    }
  };

  return (
    <div className="grid grid-row-2">
      <div className="h-full w-full grid grid-cols-2 gap-x-24 px-48 py-10">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {images.map((image, index) => {
              return (
                <CarouselItem key={index}>
                  <Image
                    key={index}
                    height={500}
                    width={500}
                    src={image}
                    loader={({ src }) => src}
                    alt={"pic from index" + { index }}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex flex-col justify-self-center w-full h-full">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <span className="mt-3 text-5xl text-red-400">{Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)
          }</span>
          <Separator className="my-4" />
          <ul className="list-disc">
            <h1 className="font-bold">{"Product's Specifications:"}</h1>
            {productSpecs.map((item) => {
              return (
                <li className="mt-1" key={item._id}>
                  <span className="text-sm font-semibold">
                    {item.attributeName}:
                  </span>
                  <span className="text-base"> {item.attributeValue}</span>
                </li>
              );
            })}
          </ul>
          <Separator className="my-4" />
          <div className="flex flex-col gap-y-2">
            {/* <label htmlFor="quantity" className="font-semibold">
              Quantity
            </label> */}
            {/* <Input
              id="quantity"
              className="w-1/6"
              type="number"
              placeholder="0"
            /> */}
            <Button
              onClick={() => {
                handleAddtoCart();
                toast({
                  duration: 3000,
                  description: "Added to your cart",
                  // action: (
                  //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                  // ),
                });
              }}
              variant={"gold_black"}
              className="mt-2 rounded-3xl w-fit"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full">
        <Separator className="my-12" />
        <div className="text-center">
          <span className="text-5xl font-semibold opacity-90 inline-block">
            What our customers are saying:
          </span>
        </div>
        <ul className="px-48 py-10 space-y-8">
          {TestArray.map((item, index) => {
            return (
              <Review
                key={index}
                title={item.title}
                name={item.name}
                date={item.date}
                comment={item.comment}
                rating={item.rating}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
