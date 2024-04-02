import ProductCard from "@/components/products/ProductCard";

export default function ProductTestPage() {
  let test_items = ["Controller", 150];
  return (
    <div>
      <ProductCard
        name="Controller Logitech ABCD XZ LightSpeed"
        price={150}
      ></ProductCard>
    </div>
  );
}
