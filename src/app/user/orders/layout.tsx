import Footer from "@/components/footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full">
      <div className="flex flex-col p-6">
        <div className="">{children}</div>
      </div>
    </div>
  );
}
