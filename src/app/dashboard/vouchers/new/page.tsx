"use client"

import VoucherForm from "@/components/dashboard/VoucherForm"

const DashboardVoucherDetails = () => {

  // const { id } = useParams()
  // const [product, setProduct] = useState<any>(null);
  
  // useEffect(() => {
  //   axios.get(`/api/dashboard/products/${id}`).then((res) => {
  //     setProduct(res.data);
  //     console.log(res.data);
  //   });
  // }, [])
  

  return (
    <div className="flex ml-72">
      <VoucherForm />
    </div>
  )
}

export default DashboardVoucherDetails