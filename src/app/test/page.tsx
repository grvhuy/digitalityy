"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const TestPage = () => {

 //fetch user 
  const { data: session } = useSession();

  const [ user , setUser ] = useState<any>({})
  const [ productId, setProductId ] = useState<string>("")
  const [ userId, setUserId ] = useState<string>("")
  // const [ quantity, setQuantity ] = useState<number>(0)

  useEffect(() => {
    setUser(session?.user)
    const userEmail = session?.user?.email
    axios.get(`/api/dashboard/users/${userEmail}`)
      .then(res => {
        if (res.data) setUserId(res.data._id)
      })
  }, [session])


  const addToCart = () => {
    axios.post("/api/cart", {
      userId, 
      product: {
        productId: "660a91ea34ae0cb55c956c54",
        quantity: 1
      }
    })
  }

  return (
    <div>
      <Button type="button" onClick={addToCart}>Add to cart</Button>
    </div>
  );
}

export default TestPage;
