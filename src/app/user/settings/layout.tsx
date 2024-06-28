import SettingSidebar from "@/components/SettingSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="grid grid-cols-12 gap-6 justify-center ">
    //   <SettingSidebar />
    <div className="p-6 dark:bg-gray-800">{children}</div>
    // </div>
  );
}
