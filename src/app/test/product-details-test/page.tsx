import ProductDetails from "@/components/products/ProductDetails";

export default function ProductTestPage() {
  let test_items = ["Controller", 150];
  return (
    <div className="h-screen w-screen">
      <ProductDetails
        name="Controller Logitech ABCD XZ LightSpeed"
        price={150}
      ></ProductDetails>
    </div>
  );
}
