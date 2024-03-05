import Sidebar from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: {children: ReactNode}) => {
  return (
    <div className="">
      <div>{children}</div>
    </div>
  );
}

export default Layout;
