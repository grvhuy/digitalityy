"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const UserInformationForm = () => {
  const { data: session } = useSession();

  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [phone, setPhone] = useState<any>("");

  useEffect(() => {
    if (session) {
      setName(session.user?.name);
      setEmail(session.user?.email);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { name, email, phone };
    console.log(data);
  };

  return (
    <form className="" onSubmit={handleSubmit} id="form1">
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label
            // for="first_name"
            className="block mb-2 text-sm font-semibold"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="first_name"
            className="min-w-96 w-[807px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="User's name"
            required
          />
        </div>
        <div>
          <label
            // for="phone"
            className="block mb-2 text-sm font-semibold"
          >
            Phone number
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            // id="phone"
            className="min-w-96 w-[807px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="123-45-678"
            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          // for="email"
          className="block mb-2 text-sm font-semibold"
        >
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="min-w-96 w-[807px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          required
        />
      </div>
      <Button variant={"gold_black"} type="submit" form="form1" className="">
        Save changes
      </Button>
    </form>
  );
};
