import Voucher from "@/lib/models/voucher.model";

export const GET = async (req: Request) => {
  const { code } = await req.url.split("/").pop();
  const voucher = await Voucher.findOne
}