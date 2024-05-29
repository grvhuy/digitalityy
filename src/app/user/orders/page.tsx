"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const OrdersHistory = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>({});
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    setUser(session?.user);
    const userEmail = session?.user?.email;
    console.log(userEmail);
    // Lay userId tu userEmail
    if (userEmail) {
      axios.get(`/api/dashboard/users/${userEmail}`).then((res) => {
        setUserId(res.data._id);
      });
    }

    if (userId) {
      axios.get(`/api/orders/${userId}`).then((res) => {
        console.log(res.data);
      });
    }

    // axios.get(`/api/orders/${userId}`).then((res) => {
    //   console.log(res.data);
    // });
    // Lay dia chi tu userId
  }, [session, userId]);

  return (
    <div className="bg-[#f5f5f5] h-screen p-20">
      <div className="bg-white">
        
        <div>
          
        </div>
      </div>
    </div>
  );

};

export default OrdersHistory;
