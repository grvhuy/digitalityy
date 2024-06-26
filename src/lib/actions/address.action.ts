"use server";

import Address from "../models/address.model";
import connectToDB from "../mongoose";

interface Address {
  receiverName: string;
  addressLine: string;
  city: string;
  country: string;
  phone: string;
  userCreated: string;
}

export async function createAddress(
  receiverName: string,
  addressLine: string,
  city: string,
  country: string,
  phone: string,
  userCreated: string
) {
  connectToDB();
  const data = await Address.create({
    receiverName,
    addressLine,
    city,
    country,
    phone,
    userCreated,
  });
  console.log("Addres created: ", data);
  return data;
}

export async function getAddressById(id: string) {
  connectToDB();
  const address = await Address.findById(id)
    .exec();
  return address;
}
