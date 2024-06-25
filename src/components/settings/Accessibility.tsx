"use client";
import { IoIosArrowBack } from "react-icons/io";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function Accessibility() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const handleReturn = () => {
    router.push("/user/settings/");
  };
  const handleLoading = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    if (document.readyState === "complete") handleLoading();
  }, []);
  
  return (
    <div className="mx-[480px] my-12 p-12 min-w-[700px] h-screen">
      <button onClick={handleReturn} className="hover:scale-105 hover:[&>div]:">
        <IoIosArrowBack className="place-self-center text-5xl rounded-full bg-zinc-100 hover:bg-zinc-200 p-1" />
      </button>
      <h1 className="text-5xl font-semibold mb-10 mt-10 min-w-max">
        Accessibility
      </h1>
      {isLoading ? (
        <BeatLoader />
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-xl p-3 bg-zinc-100 ">
            <p className="font-semibold">
              Dark Mode <br />
              <span className="font-normal">
                Customize how your theme looks on your device
              </span>
            </p>
            <Switch className="absolute bottom-1/3 right-0 mr-10" />
          </div>
          <div className="relative rounded-xl p-3 bg-zinc-100 ">
            <p className="font-semibold">
              Email Notifications <br />
              <span className="font-normal">Receive Email notifications</span>
            </p>
            <Switch className="absolute bottom-1/3 right-0 mr-10" />
          </div>
          <div className="relative rounded-xl p-3 bg-zinc-100 ">
            <p className="font-semibold">
              Language <br />
              <span className="font-normal">
                Customize how your theme looks on your device
              </span>
            </p>
            <Switch className="absolute bottom-1/3 right-0 mr-10" />
          </div>
        </div>
      )}
    </div>
  );
}
