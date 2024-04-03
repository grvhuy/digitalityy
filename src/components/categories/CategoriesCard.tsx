import Image from "next/image";

interface CategoriesCardProps {
  name: string;
  images: string[];
}

export default function CategoriesCard(props: CategoriesCardProps) {

  

  return (
    <div className="flex flex-col gap-y-2 max-w-[15rem]">
      <div className="inline-block relative max-w-[15rem] min-w-[15rem] max-h-[22rem] min-h-[22rem] bg-[#F2F2F2] overflow-hidden cursor-pointer">
        <Image
          className="place-self-center max-w-[15rem] min-w-[15rem] max-h-[22rem] min-h-[22rem] bg-cover hover:scale-110 transition-all duration-300"
          loader={({ src }) => src}
          src={props.images[0]}
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
