import Image from "next/image";

interface HeaderDropdownProps {
  name: string;
}

export default function HeaderDropdownItem(props: HeaderDropdownProps) {
  return (
    <div className="flex flex-row gap-y-2 cursor-pointer hover:bg-gray-50">
      <div className="inline-block relative max-w-[3rem] min-w-[3rem] max-h-[3rem] min-h-[3rem] bg-[#F2F2F2] overflow-hidden ">
        <Image
          className="place-self-center max-w-[3rem] min-w-[3rem] max-h-[3rem] min-h-[3rem] bg-cover hover:scale-110 transition-all duration-300"
          src="/images/6.png"
          alt="controller-image"
          fill={true}
        ></Image>
      </div>
      <h1 className="place-self-center ml-5 text-sm font-semibold text-wrap">
        {props.name}
      </h1>
    </div>
  );
}
