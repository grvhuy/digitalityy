import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
}

export default function ProductCard(props: ProductCardProps) {
  const length0 = props.description.length;
  return (
    <div className="flex flex-col gap-y-2 max-w-[15rem]">
      <div className="relative max-w-[15rem] min-w-[15rem] max-h-[22rem] min-h-[22rem] bg-[#F2F2F2] overflow-hidden cursor-pointer">
        <Image
          className="place-self-center max-w-[14rem] min-w-[14rem] max-h-[20rem] min-h-[20rem] hover:scale-110 transition-all duration-300"
          src="/images/6.png"
          alt="controller-image"
          fill={true}
        ></Image>
      </div>
      <div className="flex flex-col gap-y-1 ">
        <h1 className="font-semibold text-wrap">{props.name}</h1>
        <h1>
          {"$"}
          {props.price}
        </h1>
        <h1>{props.description}</h1>
      </div>
    </div>
  );
}
