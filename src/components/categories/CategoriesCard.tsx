import Image from "next/image";

interface CategoriesCardProps {
  name: string;
}

export default function CategoriesCard(props: CategoriesCardProps) {
  return (
    <div className="flex flex-col gap-y-2 max-w-[15rem]">
      <div className="relative max-w-[15rem] min-w-[15rem] max-h-[22rem] min-h-[22rem] bg-[#F2F2F2]">
        <Image
          className="place-self-center max-w-[14rem] min-w-[14rem] max-h-[20rem] min-h-[20rem]"
          src="/images/6.png"
          alt="controller-image"
          fill={true}
        ></Image>
      </div>
      <div className="flex flex-col gap-y-1 ">
        <h1 className="font-semibold text-wrap">{props.name}</h1>
      </div>
    </div>
  );
}
