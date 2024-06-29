import ProductDetails from "@/components/products/ProductDetails";

export default function ProductTestPage({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div className="h-full w-screen">
      <ProductDetails params={params}></ProductDetails>
    </div>
  );
}
