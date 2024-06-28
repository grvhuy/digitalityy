"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  const { orderId } = useParams();
  return (
    <div className="flex justify-center h-screen mt-40">
      <div className="flex flex-col items-center">
        <Image src="/images/check.png" alt="Success" width={200} height={200} />
        <h1 className="mt-4 text-2xl font-bold text-yellow-600">Thank you for your order</h1>
        <div className="flex flex-col">
          <Button variant="gold_black" className="mt-4" onClick={ () => router.push('/collections')}>
            Continue Shopping
          </Button>
          <Link

          href={`/user/orders/`}>
            <Button variant="ghost" className="mt-2">
              View your Orders {orderId}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;