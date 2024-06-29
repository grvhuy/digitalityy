import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-12 mb-10">
      <h1 className="text-center text-4xl font-semibold mt-10 ">
        All listed categories
      </h1>
      {children}
    </div>
  );
}
