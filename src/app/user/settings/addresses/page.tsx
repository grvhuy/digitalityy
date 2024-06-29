"use client";
import { AddAddressForm } from "@/components/AddAddressForm";
import { UserInformationForm } from "@/components/UserInformationForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const UserAddresses = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [userId, setUserId] = useState<string>("");
  const [defaultAddressId, setDefaultAddressId] = useState<string>("");
  const [addresses, setAddresses] = useState<any[]>([]);

  const router = useRouter();
  const handleReturn = () => {
    router.push("/user/settings/");
  };
  useEffect(() => {
    const userEmail = session?.user?.email;
    axios.get(`/api/dashboard/users/${userEmail}`).then((response) => {
      const data = response.data;
      if (data) {
        setUserId(data._id);
        setDefaultAddressId(data.defaultAddress);
        axios.get(`/api/address/${data._id}`).then((response) => {
          const data = response.data;
          if (data) setAddresses(data);
        });
      }
    });
  }, [session, addresses]);

  const handleEditAddress = async () => {};
  // const handleSetDefaultAddress = async (addressId: string) => {
  //   await axios.post(`/api/address/${userId}`, {
  //     defaultAddressId: addressId,
  //   }).then(
  //     (response) => {
  //       console.log(response.data);
  //     }
  //   ).catch(
  //     (error) => {
  //       console.log(error);
  //     }
  //   )

  // };

  return (
    <div className="mx-24 mt-12">
      <button onClick={handleReturn} className="hover:scale-105 hover:[&>div]:">
        <IoIosArrowBack className="mx-[384px] place-self-center text-5xl rounded-full bg-zinc-100 hover:bg-zinc-200 p-1" />
      </button>
      <div className="bg-zinc-100 w-full px-6 dark:bg-gray-800 p-4 rounded-md mt-12">
        <h2 className="mb-4 text-5xl font-semibold text-gray-900">
          Your Addresses
        </h2>
        <div className="flex justify-end">
          <AddAddressForm />
        </div>
        {/* address card */}
        {addresses.map((address, index) => {
          return (
            <div
              key={index}
              className="mt-4 flex flex-col justify-center w-full p-4 bg-white dark:bg-gray-900 rounded-md shadow-md"
            >
              <div className="flex items-center justify-between w-full">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {address.receiverName}
                    <span className="ml-2 text-gray-500 font-normal text-sm">
                      {address.phoneNumber}
                    </span>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {address.addressLine}, {address.ward}, {address.district},{" "}
                    {address.city}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 items-end">
                  <div className="space-x-2">
                    <AddAddressForm
                      name={address.receiverName}
                      phone={address.phoneNumber}
                      {...address}
                      // userId={userId}
                    />
                    <button className="text-red-500 dark:text-red-300">
                      Delete
                    </button>
                  </div>
                  {/* Set default */}
                  {defaultAddressId === address._id ? (
                    <Button
                      disabled
                      type="button"
                      onClick={() => {
                        axios
                          .patch(`/api/address/${userId}`, {
                            addressId: address._id,
                          })
                          .then((response) => {
                            console.log(response.data);
                          });
                      }}
                      className="text-red-500 border-red-500"
                      variant="outline"
                    >
                      Default Address
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => {
                        axios
                          .patch(`/api/address/${userId}`, {
                            addressId: address._id,
                          })
                          .then((response) => {
                            console.log(response.data);
                          });
                      }}
                      className=""
                      variant="outline"
                    >
                      Set as default
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserAddresses;
