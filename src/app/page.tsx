import {
  default as MaxWidthWrapper,
  default as MaxWitdthWrapper,
} from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowDownToLine, CheckCircleIcon, Leaf } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "./api/auth/[...nextauth]/options";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import Footer from "@/components/footer/Footer";
import LandingPage from "@/components/landing-page/LandingPage";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircleIcon,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Something else",
    Icon: Leaf,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <div className="w-screen h-screen">
          <MaxWitdthWrapper>
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Your marketplace with high quality{" "}
                <span className="text-blue-600">devices.</span>.
              </h1>
              <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                Welcome to Digitality. Every assets on our platform is verified
                by our team to ensure our highest quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/products" className={buttonVariants()}>
                  Browse Products
                </Link>
                <Button variant="ghost">Something more &rarr; </Button>
              </div>
            </div>
            {/* To-do: List products */}
          </MaxWitdthWrapper>

          <section className="border-t border-gray-200 bg-gray-50">
            <MaxWidthWrapper className="py-20">
              <CategoryCarousel />
            </MaxWidthWrapper>
          </section>
          <section>
            <Footer />
          </section>
        </div>
      ) : (
          <LandingPage />
      )}
    </>
  );
}
