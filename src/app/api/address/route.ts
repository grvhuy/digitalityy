import Address from "@/lib/models/address.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  connectToDB()
  const addresses = await Address.find();
  return NextResponse.json(addresses);
}

export const POST = async (req: Request) => { 
  const values = await req.json();
  const { userCreated, name, phoneNumber, city, district, ward, addressLine } = values;
  connectToDB()

  const address = new Address({
    receiverName: name,
    phoneNumber,
    city,
    district,
    ward,
    addressLine,
    userCreated,
  });
  address.save()
  return NextResponse.json(address);
}

export const PUT = async (req: Request) => {
  const values = await req.json();
  const { _id, name, phone, city, district, ward, addressLine } = values;
  connectToDB()
  await Address.findOne({ _id})
    .then((address) => {
      address.name = name;
      address.phone = phone;
      address.city = city;
      address.district = district;
      address.ward = ward;
      address.addressLine = addressLine;
      address.save();
    })
  return NextResponse.redirect("/user/settings/addresses");
}