import ProductCard from "@/components/products/ProductsCard";

export default function ProductTestPage() {
  let test_items = ["Controller", 150];
  return (
    <div>
      <ProductCard name="Controller" price={150}></ProductCard>
    </div>
  );
}
