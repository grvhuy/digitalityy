import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoriesCardProps {
  name: string;
  images: string[];
  // _id: string;
  onClick?: React.MouseEventHandler;
}

export default function CategoriesCard(props: CategoriesCardProps) {
  const router = useRouter();

  return (
    <div
      className="group flex flex-col gap-y-2 max-w-[20rem] "
      onClick={props.onClick}
    >
      <div className="flex flex-col relative items-center justify-center max-h-[22rem] min-h-[22rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
        <Image
          width={40}
          height={40}
          className="place-self-center max-w-[12rem] min-w-[12rem] bg-cover hover:scale-110 transition-all duration-300"
          loader={({ src }) => src}
          src={props.images[0]}
          alt={`${props.name} image`}
          // fill={true}
        ></Image>
        <div className="flex flex-col absolute bottom-2 gap-y-1 group-hover:underline ">
          <h1 className="font-semibold text-wrap text-xl">{props.name}</h1>
        </div>
      </div>
    </div>
  );
}
