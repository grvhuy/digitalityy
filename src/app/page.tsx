import LandingPage from "@/components/landing-page/LandingPage";
import connectToDB from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { useEffect } from "react";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  await connectToDB();
  const session = await getServerSession(options);

  return <>{session ? <LandingPage /> : <LandingPage />}</>;
}
