import ProductsListing from "@/components/products/ProductsListing";
export default function CategoriesProductsListing({
  params,
}: {
  params: { categoryId: string };
}) {
  return (
    <div className="mt-8 mx-8 h-screen">
      <ProductsListing params={params} />;
    </div>
  );
}
