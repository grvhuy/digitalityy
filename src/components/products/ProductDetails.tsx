"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Input, Textarea } from "@nextui-org/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Review from "./Review";
import { Label } from "../ui/label";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const router = useRouter();
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
  const [product, setProduct] = useState<any[]>([]);
  const [productSpecs, setProductspecs] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [variant, setVariant] = useState<string[]>([]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [isChanged, setIsChanged] = useState(false);

  const [allReviews, setAllReviews] = useState<any[]>([]);

  const handleClick = (index: any) => {
    setRating(index);
  };

  // Lay tat ca review
  useEffect(() => {
    axios.get(`/api/reviews/${params.productId}`).then((response) => {
      // console.log("review data: ", response.data);
      setAllReviews(response.data);
    });
  }, [isChanged]);
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
      setVariant(result.data.variant.map((item: any) => item.variant));
      setCategoryId(result.data.category._id);
      // console.log(result.data.productSpecs);
    });
  }, [params.productId]);

  useEffect(() => {
    if (categoryId === "") return;
    axios.get(`/api/dashboard/products/category/${categoryId}`).then((result) => {
      // console.log(result.data);
      setSimilarProducts(result.data);
    });
  }, [categoryId]);

  const handleAddtoCart = async () => {
    //Neu chua dang nhap thi ve page login
    if (!session) {
      window.location.href = "/login";
    }
    if (userId) {
      try {
        axios
          .put(`/api/cart/${userId}`, {
            userId: userId,
            product: {
              productId: params.productId,
              quantity: 1,
              price,
              image: images[0],
            },
          })
          .then((response) => {
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="grid grid-row-3 mx-36 mt-12">
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
          <span className="mt-3 text-5xl text-red-400">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </span>
          <Separator className="my-4" />
          <h1 className="text-xl font-normal text-gray-500">
            {product.quantity} products left.
          </h1>
          <div className="w-full max-w-xs">
            <label
              className="block my-2 font-normal text-xl"
              htmlFor="variant-select"
            >
                {variant.length > 0 ? "Select a variant" : ""}
            </label>
            <ToggleGroup className="" type="single">
              {variant.map((item, index) => (
                <ToggleGroupItem
                  className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={item}
                  key={index}
                >
                  {item}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {/* <select
              id="variant-select"
              // value={selectedVariant}
              // onChange={handleChange}
              className="block w-full mt-1 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select a variant
              </option>
              {variant.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select> */}
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
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
              className="w-fit"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-20 grid grid-cols-2 space-x-4">
        <div>
          <h1 className="font-bold">{"Product's Specifications:"}</h1>
          <div className="bg-gray-100 rounded-xl p-4 mt-6">
            <table className="w-full">
              {productSpecs.map((item) => {
                if (item.attributeName && item.attributeValue)
                  return (
                    <tr className="border-b-2 border-b-gray-200" key={item._id}>
                      <td className="font-semibold p-4">
                        {item.attributeName}
                      </td>
                      <td className="">{item.attributeValue}</td>
                    </tr>
                  );
              })}
            </table>
          </div>
        </div>
        <div className="mr-20">
          {/* TODO */}
          <h1 className="font-bold">{"Description: "}</h1>
          <div className="bg-gray-100 rounded-xl p-4 mt-6  mr-10">
            <p>{product.description}</p>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="gold_black" className="px-3 flex ml-auto mr-auto">
                Send your review
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[54rem]">
              <DialogHeader>
                <DialogTitle>Your review about {product.name}</DialogTitle>
                <DialogDescription>
                  Your opinions will help us improve our service.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-3 space-x-4">
                <div className="flex-1 gap-2">
                  <Image
                    src={images[0]}
                    alt="product image"
                    width={500}
                    height={500}
                    loader={({ src }) => src}
                    className="border"
                  />
                </div>
                <div className="flex flex-col col-span-2 space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div>
                      <div className="flex items-center mx-2">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            onClick={() => handleClick(index + 1)}
                            className={`w-4 h-4 ms-1 ${
                              index < rating
                                ? "text-yellow-300"
                                : "text-gray-300 dark:text-gray-500"
                            } hover:`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea
                      id="comment"
                      className=""
                      placeholder="Your comment here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="destructive">
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      if (!rating || !comment) {
                        toast({
                          duration: 3000,
                          description: "Please rate the product",
                        });
                        return;
                      }
                      axios
                        .post(`/api/reviews/${params.productId}`, {
                          comment: comment,
                          rating: rating,
                          userId: userId,
                        })
                        .then((response) => {
                          // console.log(response.data);
                          setIsChanged(!isChanged);
                        });
                    }}
                    type="button"
                    className="rounded-md"
                    variant="gold_black"
                  >
                    Send Review
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Review có mới nhất sẽ đứng được render đầu tiên */}
          {allReviews && allReviews.map((review, index) => (
            <>
              <Review
                reviewId={review._id}
                userId={review.user._id}
                currentUserId={userId}
                key={index}
                name={review.user.name}
                title={review.title}
                comment={review.comment}
                rating={review.rating}
                date={review.createdAt}
              />
              <Separator />
            </>
          ))}
        </ul>
        <Separator className="my-12" />
        <div className=" my-12">
          <div className="text-left">
            <span className="ml-8 text-5xl font-semibold opacity-90 inline-block">
              You might like:
            </span>
          </div>
          <Carousel className="mx-20 mt-12">
            <CarouselContent>
              {similarProducts && similarProducts.map((item, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
                    <ProductCard
                      image={item.images[0]}
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      description={item.description}
                      onClick={() => router.push("/products/" + item._id)}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
