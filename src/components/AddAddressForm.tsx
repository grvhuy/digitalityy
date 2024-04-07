"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AddAddressForm = ({
  _id,
  name: existingName,
  phone: existingPhone,
  city: existingCity,
  district: existingDistrict,
  ward: existingWard,
  addressLine: existingAddressLine,
}: {
  _id?: string;
  name?: string;
  phone?: string;
  city?: string;
  district?: string;
  ward?: string;
  addressLine?: string;
}) => {
  const { data: session } = useSession();
  const user = session?.user;


  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>(existingName || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(existingPhone || "");
  const [city, setCity] = useState<string>(existingCity || "");
  const [district, setDistrict] = useState<string>(existingDistrict || "");
  const [ward, setWard] = useState<string>(existingWard || "");
  const [addressLine, setAddressLine] = useState<string>(
    existingAddressLine || ""
  );
  const [error, setError] = useState<string>("");

  //lay tt user
  useEffect(() => {
    const userEmail = session?.user?.email;
    axios.get(`/api/dashboard/users/${userEmail}`).then((response) => {
      const data = response.data;
      if (data) setUserId(data._id);
    });
  }, [session]);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !phoneNumber || !city || !district || !ward || !addressLine) {
      setError("Please fill in all fields");
      return;
    }
    if (_id) {
      axios.put(`/api/address/${_id}`, {
        name,
        phoneNumber,
        city,
        district,
        ward,
        addressLine,
      });
    } else {
      if (userId) {
        axios.post("/api/address", {
          name,
          phoneNumber,
          city,
          district,
          ward,
          addressLine,
          userCreated: userId,
        });
      } 
    }

    router.push('/user/settings/addresses');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {_id ? (
          <button
            type="button"
            // onClick={}
            className="text-blue-500 dark:text-blue-300 bg-white"
          >
            Edit
          </button>
        ) : (
          <Button className="bg-blue-500" variant="default">
            Add address
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
          <DialogDescription>
            Make changes to your addresses here. Click save changes when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} action="">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
            <h1 className="font-bold flex justify-end">Address</h1>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Province/City
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="district" className="text-right">
                District
              </Label>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ward" className="text-right">
                Ward
              </Label>
              <Input
                id="ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="detail" className="text-right">
                Address Detail
              </Label>
              <Input
                id="detail"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogClose asChild>
            <Button
              onClick={() => {
                //close the dialog
              }}
              className="flex float-right"
              type="submit"
            >
              Save changes
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};
