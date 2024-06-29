"use client";
import { IoIosArrowBack } from "react-icons/io";
import { UserInformationForm } from "@/components/UserInformationForm";
import { useRouter } from "next/navigation";

const UserInformation = () => {
  const router = useRouter();
  const handleReturn = () => {
    router.push("/user/settings/");
  };
  return (
    <div className="w-screen h-full mx-[480px] dark:bg-gray-800 p-2 mt-12">
      <button onClick={handleReturn} className="hover:scale-105 hover:[&>div]:">
        <IoIosArrowBack className="place-self-center text-5xl rounded-full bg-zinc-100 hover:bg-zinc-200 p-1" />
      </button>
      <h2 className="my-12 text-5xl font-semibold dark:text-white">
        User Information
      </h2>
      <UserInformationForm />
    </div>
  );
};

export default UserInformation;
