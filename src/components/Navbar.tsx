'use client'
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { cn } from "@/lib/utils";


const Navbar = () => {

  const { data: session } = useSession();
  const user = session?.user;

  const isHidden = false;

  return isHidden ? null : (
    <div className="bg-white sticky z-100 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0 ">
                <Link href="/">
                  <Image
                    src="/images/vrglass.png"
                    alt="VR Glass"
                    width={60}
                    height={60}
                  />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                {/* <NavItems /> */}
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <div className="flex items-center space-x-2">
                      <h3>Hello <span className="text-blue-500 font-semibold">{user?.name}</span> !</h3>
                      <Button
                      type="button"
                      className={cn("bg-white-500 text-gray-700", buttonVariants({ variant: "ghost" }))}
                      onClick={() => signOut()}
                      >
                      Sign Out
                    </Button>
                    </div>
                  
                  ) : (
                    <Link
                      className={buttonVariants({ variant: "ghost" })}
                      href="/sign-in"
                    >
                      Sign In
                    </Link>
                  )}
                  {user ? null : (
                    <span
                      aria-hidden="true"
                      className="h-6 w-px bg-gray-200"
                    ></span>
                  )}
                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      className={buttonVariants({ variant: "ghost" })}
                      href="/sign-up"
                    >
                      Create Account
                    </Link>
                  )}
                  {user ? null : (
                    <span
                      aria-hidden="true"
                      className="h-6 w-px bg-gray-200"
                    ></span>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">{/* <Cart /> */}</div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
