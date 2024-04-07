"use client"

import { UserInformationForm } from "@/components/UserInformationForm";



const UserInformation = () => {
  return (
    <div className="w-full ml-80 px-6 bg-gray-100 dark:bg-gray-800 p-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">User Information</h2>
      <UserInformationForm />
    </div>
  )
}

export default UserInformation;