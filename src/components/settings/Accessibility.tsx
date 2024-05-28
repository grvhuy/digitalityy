"use client";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

export default function Accessibility() {
  const router = useRouter();
  const handleReturn = () => {
    router.push("/profile/settings/");
  };
  return (
    <div className="rounded-3xl mx-60 my-12 p-12 ">
      <button onClick={handleReturn} className="hover:scale-105 hover:[&>div]:">
        <IoIosArrowBack className="place-self-center text-4xl rounded-full bg-gray-400 p-1" />
      </button>
      <h1 className="text-3xl font-semibold mb-6 mt-4">Accessibility</h1>
      <div className="space-y-6">
        <div className="relative rounded-xl p-3 bg-gray-200 ">
          <p className="font-semibold">
            Dark Mode <br />
            <span className="font-normal">
              Customize how your theme looks on your device
            </span>
          </p>
          <Switch className="absolute bottom-1/3 right-0 mr-10" />
        </div>
        <div className="relative rounded-xl p-3 bg-gray-200 ">
          <p className="font-semibold">
            Email Notifications <br />
            <span className="font-normal">Receive Email notifications</span>
          </p>
          <Switch className="absolute bottom-1/3 right-0 mr-10" />
        </div>
        <div className="relative rounded-xl p-3 bg-gray-200 ">
          <p className="font-semibold">
            Language <br />
            <span className="font-normal">
              Customize how your theme looks on your device
            </span>
          </p>
          <Switch className="absolute bottom-1/3 right-0 mr-10" />
        </div>
      </div>
    </div>
  );
}
