import AuthImagesSlider from "@/components/signin/auth_images_slider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <div className="w-2/4 h-full flex-initial">
        <AuthImagesSlider></AuthImagesSlider>
      </div>
      {children}
    </div>
  );
}
