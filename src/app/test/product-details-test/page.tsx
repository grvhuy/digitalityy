import ProductDetails from "@/components/products/ProductDetails";

export default function ProductTestPage() {
  let test_items = ["Controller", 150];
  return (
    <div className="h-screen w-screen">
      <ProductDetails
        name="Controller Logitech ABCD XZ LightSpeed"
        price={150}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
"
      ></ProductDetails>
    </div>
  );
}
