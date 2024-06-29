import Footer from "@/components/footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f5f5f5] w-full">
      <div className="flex flex-col ">
        <div className="">{children}
        </div>

      </div>
    </div>
  );
}
