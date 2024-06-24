"use client"
import SearchProducts from "@/components/products/SearchProductListing";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchProductsListing({
  params,
}: {
  params: { term: string };
}) {

  // const [search, setSearch] = useState(params.term);

  useEffect(() => {
    console.log(params);
    // try {
    //   // Thay thế dấu cách bằng dấu "-"
    //   const formattedSearch = search.replace(/\s+/g, '-');

    //   // Gửi yêu cầu tìm kiếm đến API sử dụng Axios
    //   axios.get(`/api/search?keyword=${formattedSearch}`).then(
    //     response => {
    //       console.log(response.data);
    //     }
    //   )
    // } catch (error) {
    //   console.error('Error:', error);
    //   // Xử lý lỗi nếu có
    // }
  })

  return (
    <div className="mt-8 mx-8 h-screen">
      <SearchProducts params={params.term} />
    </div>
  );
}
