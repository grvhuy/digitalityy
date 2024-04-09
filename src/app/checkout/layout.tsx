import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/footer/Footer";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}
    <Footer />
  </div>; 
};

export default Layout;
