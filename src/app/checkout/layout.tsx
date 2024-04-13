import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/footer/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <ScrollArea className="">
    {children}
    <Footer />
  </ScrollArea>; 
};

export default Layout;
