import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-center text-4xl font-semibold mt-16 ">
        All listed categories
      </h1>
      {children}
      <Footer />
    </div>
  );
}
