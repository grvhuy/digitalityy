import SearchProducts from "@/components/products/SearchProductListing";

export default function SearchProductsListing({
  params,
}: {
  params: { searchTerm: string };
}) {
  return (
    <div className="mt-8 mx-8 h-screen">
      <SearchProducts params={params} />
    </div>
  );
}
