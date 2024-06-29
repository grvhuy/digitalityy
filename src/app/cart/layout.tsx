
import Sidebar from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: {children: ReactNode}) => {
  return (
    <div className="flex bg-[#f5f5f5]">
      <div className=" mr-auto ml-auto">{children}</div>
    </div>
  );
}

export default Layout;
