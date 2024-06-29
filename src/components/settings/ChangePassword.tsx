"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BeatLoader } from "react-spinners";

export default function ChangePassword() {
  const router = useRouter();
  const [visible0, setVisible0] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
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
    <div className="mx-[480px] mt-12 p-2 h-full min-w-[700px]">
      <button onClick={handleReturn} className="hover:scale-105 hover:[&>div]:">
        <IoIosArrowBack className="place-self-center text-5xl rounded-full bg-zinc-100 hover:bg-zinc-200 p-1" />
      </button>
      <h1 className="text-5xl font-semibold mb-10 mt-10 min-w-max">
        Change your password
      </h1>
      {isLoading ? (
          <BeatLoader/>
      ) : (
        <form className="space-y-3">
          <div className="">
            <Label className="font-semibold" htmlFor="password">
              Current password
            </Label>
            <div className="relative">
              <Input
                className="min-w-96"
                type={visible0 ? "text" : "password"}
                id="password"
                placeholder="Enter your current password"
                required
              />
              <button
                className="absolute right-0 top-1/4 mr-3"
                onClick={() => setVisible0(!visible0)}
              >
                {!visible0 ? (
                  <FaRegEyeSlash className="text-2xl rounded-full hover:bg-gray-100 hover:scale-105" />
                ) : (
                  <FaRegEye className="text-2xl rounded-full hover:bg-gray-100 hover:scale-105" />
                )}
              </button>
            </div>
          </div>
          <div>
            <Label className="font-semibold" htmlFor="new-password">
              New password
            </Label>
            <div className="relative">
              <Input
                className="min-w-96"
                type={visible1 ? "text" : "password"}
                id="new-password"
                placeholder="Enter your new password"
                required
              />
              <button
                className="absolute right-0 top-1/4 mr-3"
                onClick={() => setVisible1(!visible1)}
              >
                {!visible1 ? (
                  <FaRegEyeSlash className="text-2xl rounded-full hover:bg-gray-100 hover:scale-105" />
                ) : (
                  <FaRegEye className="text-2xl rounded-full hover:bg-gray-100 hover:scale-105" />
                )}
              </button>
            </div>
          </div>
          <div>
            <Label className="font-semibold" htmlFor="new-password-again">
              Re-enter your new password
            </Label>
            <div className="relative">
              <Input
                className="min-w-96"
                type={visible2 ? "text" : "password"}
                id="new-password-again"
                placeholder="Re-enter your new password"
                required
              />
              <button
                className="absolute right-0 top-1/4 mr-3"
                onClick={() => setVisible2(!visible2)}
              >
                {!visible2 ? (
                  <FaRegEyeSlash className="text-2xl rounded-full hover:bg-gray-100 hover:scale-105" />
                ) : (
                  <FaRegEye className="text-2xl rounded-full hover:bg-gray-100 hover:scale-105" />
                )}
              </button>
            </div>
          </div>
          <div className="">
            <Button variant="link">Cancel</Button>
            <Button variant="gold_black">Set new password</Button>
          </div>
        </form>
      )}
    </div>
  );
}
