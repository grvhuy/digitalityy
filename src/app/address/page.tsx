"use client"

import { Button } from "@/components/ui/button";
import { createAddress } from "@/lib/actions/address.action";
import { useSession } from "next-auth/react";


const AddressPage = () => {

  const { data: session } = useSession()
  const user = session?.user

  const addressDummyData = {
    receiverName: "Nguyen Van A",
    addressLine: "KTX khu B - DHQG TP.HCM",
    city: "HCM",
    country: "VN",
    phone: "123-456-7890",
    userCreated: user?.name
  }


  return (
    <div className="ml-72">
      <h1>About Page</h1>
      <Button type="button" onClick={() => 
        createAddress(
          addressDummyData.receiverName,
          addressDummyData.addressLine,
          addressDummyData.city,
          addressDummyData.country,
          addressDummyData.phone,
          addressDummyData.userCreated
        )
      }>
        Create dummy address
      </Button>
    </div>
  );
}

export default AddressPage;