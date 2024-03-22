import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
}

export default function ProductDetails(props: ProductCardProps) {
  return (
    <div className="h-screen w-screen grid grid-cols-2 gap-x-2 p-48">
      <div className="relative bg-[#F2F2F2] cursor-pointer">
        <Image
          className="place-self-center object-fill hover:scale-110 transition-all duration-300"
          src="/images/6.png"
          alt="controller-image"
          fill={true}
        ></Image>
      </div>
      <div className="flex flex-col place-self-center">
        <h1 className="font-semibold text-wrap text-2xl">{props.name}</h1>
        <h1>
          {"$"}
          {props.price}
        </h1>
      </div>
    </div>
  );
}
