"use client";

import { Button } from "@/components/ui/button";
import { createAddress, getAddressById } from "@/lib/actions/address.action";
import { getProductsByBrandname } from "@/lib/actions/product.action";
import axios from "axios";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserSession {
  user: {
    email: string;
    name: string;
  };
}

const AddressPage = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserName, setCurrentUserName] = useState<any>();
  const [currentUserEmail, setCurrentUserEmail] = useState<any>();

  const { data: session } = useSession();
  const user = session?.user;
  useEffect(() => {
    setCurrentUserEmail(user?.email);
    setCurrentUserName(user?.name);
  }, [session]);

  useEffect(() => {
    async function fetchData() {
      axios.get(`/api/dashboard/users/${currentUserEmail}`).then((res) => {
        setCurrentUserId(res.data?._id);
      });
    }
    fetchData();
  }, []);

  const addressDummyData = {
    receiverName: "Nguyen Van A",
    addressLine: "KTX khu B - DHQG TP.HCM",
    city: "HCM",
    country: "VN",
    phone: "123-456-7890",
    userCreated: currentUserName,
  };

  const orderDummyData = {
    userId: "asd",
    status: "pending",
    subtotal: 100,
    address: addressDummyData,
    userCreated: currentUserEmail,
    items: [
      {
        id: "testid1",
        name: "item 1",
        description: "item 1 description",
        category: "item 1 category",
        price: 100,
        quantity: 1,
        unit: "item 1 unit",
        totalPrice: 100,
      },
    ],
    paymentMethod: "momo",
    location: "HCM",
  };

  const handleClick = () => {
    axios.post("/api/orders", JSON.stringify(orderDummyData), {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => console.log(res));
  };

  return (
    <div className="ml-72">
      <h1>Testing Page</h1>
      <Button
        type="button"
        onClick={() =>
          {
          createAddress(
            addressDummyData.receiverName,
            addressDummyData.addressLine,
            addressDummyData.city,
            addressDummyData.country,
            addressDummyData.phone,
            currentUserEmail
          )
        }
        }
      >
        Create dummy address
      </Button>
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        Create dummy order
      </Button>
    </div>
  );
};

export default AddressPage;
