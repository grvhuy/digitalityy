"use client";

import ProductForm from "@/components/dashboard/ProductForm";
import VoucherForm from "@/components/dashboard/VoucherForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardVoucherDetails = () => {
  const [voucher, setVoucher] = useState<any>({});
  const { voucherId } = useParams();

  useEffect(() => {
    axios.get(`/api/dashboard/vouchers/${voucherId}`).then((res) => {
      setVoucher(res.data);
      console.log(res.data);
    });
  }, [voucherId]);

  if (voucher) {
    return (
      <div className="flex ml-72">
        <VoucherForm
          _id={voucher._id}
          minimumOrderValue={voucher.minimumOrderValue}
          discount={voucher.discount}
          code={voucher.code}
          description={voucher.description}
          startDate={voucher.startDate}
          endDate={voucher.endDate}
          usageLimit={voucher.usageLimit}
          usageCount={voucher.usageCount}
          products={voucher.products}
          appliedAll={voucher.appliedAll}
        />
      </div>
    );
  }
};

export default DashboardVoucherDetails;
