import Footer from "@/components/footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f5f5f5] h-full">
      <div className="">
        {children}
        <Footer />
      </div>
    </div>
  )
  
}
