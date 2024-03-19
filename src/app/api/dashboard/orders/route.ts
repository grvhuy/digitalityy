import connectToDB from "@/lib/mongoose"


export const GET = async () => {
  try {
    connectToDB()
    const orders = await
  } catch (error) {
    console.log(error)
  }
}

export const POST = async (req: Request) => {

}