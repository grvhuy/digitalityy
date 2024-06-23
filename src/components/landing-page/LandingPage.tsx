import Image from "next/image";
import { Button } from "../ui/button";
import HorizontalCategories from "./HorizontalCategories";

export default function LandingPage() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-row">
        <section className="min-w-full h-4/6 min-h-[600px] bg-cover bg-center bg-[url('/images/banner.png')] ">
          {/* <img
            className="ml-36"
            src="/images/banner_transparent.png"
            alt="Banner Picture"
            draggable="false"
          /> */}
          <div className="w-1/3 ml-[12rem] my-36">
            <h1 className="text-4xl text-white font-semibold">
              Enhance your surrounding
            </h1>
            <p className="text-2xl mt-6 text-white">
              The new <b>G Pro X</b>.<br /> Out now.
            </p>
            <Button className="px-8 py-8 mt-6 text-2xl rounded-none bg-white text-black hover:bg-transparent hover:outline hover:outline-2 hover:outline-white hover:text-white">
              Explore
            </Button>
          </div>
        </section>
      </div>
      <div className="">
        <h1 className="text-4xl my-12 ml-[12rem] min-w-full">
          Shop by Categories
        </h1>
        <div className="mx-64">
          <HorizontalCategories />
        </div>
      </div>
    </div>
  );
}
