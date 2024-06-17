"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../ui/button";

export default function ChangePassword() {
  const router = useRouter();
  const [visible0, setVisible0] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const handleReturn = () => {
    router.push("/profile/settings/");
  };
  return (
    <div className="mx-[480px] my-12 p-2 h-screen">
      <button onClick={handleReturn} className="hover:scale-105 hover:[&>div]:">
        <IoIosArrowBack className="place-self-center text-5xl rounded-full bg-gray-200 hover:bg-gray-300 p-1" />
      </button>
      <h1 className="text-5xl font-semibold mb-10 mt-10">
        Change your password
      </h1>
      <form className="space-y-3">
        <div>
          <Label className="font-semibold" htmlFor="password">
            Current password
          </Label>
          <div className="relative">
            <Input
              className=""
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
              className=""
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
              className=""
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
        <div className="mt-12">
          <Button variant="link">Cancel</Button>
          <Button variant="gold_black">Set new password</Button>
        </div>
      </form>
    </div>
  );
}
