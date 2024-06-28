import AuthImagesSlider from "@/components/signin/auth_images_slider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 w-screen h-screen gap-x-16">
      <div>
        <AuthImagesSlider></AuthImagesSlider>
      </div>
      <div className="space-x-12">
        {children}
      </div>
    </div>
  );
}
