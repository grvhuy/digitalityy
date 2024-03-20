import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative max-w-[15rem] min-w-[15rem] max-h-[22rem] min-h-[22rem] bg-[#F2F2F2]">
        <Image
          className="place-self-center max-w-[14rem] min-w-[14rem] max-h-[20rem] min-h-[20rem]"
          src="/images/6.png"
          alt="controller-image"
          fill={true}
        ></Image>
      </div>
      <div className="flex flex-col gap-y-1">
        <h1 className="font-semibold">{props.name}</h1>
        <h1>
          {"$"}
          {props.price}
        </h1>
      </div>
    </div>
  );
}
