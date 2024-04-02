import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen">{children}</div>;
}
