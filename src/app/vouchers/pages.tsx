import axios from "axios";
import { useEffect, useState } from "react";

export const VouchersPage = () => {

  const [vouchers, setVouchers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from API
    axios.get("/api/vouchers").then((res) => {
      console.log(res.data);
      setVouchers(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Vouchers</h1>
    </div>
  );
}