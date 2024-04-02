
import Sidebar from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: {children: ReactNode}) => {
  return (
    <div className="flex bg-[#f5f5f5]">
        <div className="">{children}</div>  
    </div>
  );
}

export default Layout;
