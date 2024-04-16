import Navbar from "@/components/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: {children: ReactNode}) => {
  return (
    <div className="ml-4">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
