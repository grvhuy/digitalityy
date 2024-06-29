import Footer from "@/components/footer/Footer";
import ProductsListing from "@/components/products/ProductsListing";
export default function CategoriesProductsListing({
  params,
}: {
  params: { categoryId: string };
}) {
  return (
    <div className="mt-8 h-full">
      <ProductsListing params={params} />;
    </div>
  );
}
