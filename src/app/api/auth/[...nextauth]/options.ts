import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/lib/clientPromise'
import { Adapter } from 'next-auth/adapters'
import connectToDB from '@/lib/mongoose'
import User from '@/lib/models/user.model'
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
    providers: [
      GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",

                },
                password: {
                    label: "Password:",
                    type: "password",

                }
            },
            async authorize(credentials: any) {
                const { email, password } = credentials

                try {
                    await connectToDB()

                    const user = await User.findOne({ email })

                    if (!user) { 
                        return null
                    }

                    const isValid = await bcrypt.compare(password, user.password)

                    if (!isValid)  {
                        return null
                    }

                    return user;

                } catch (error) {
                    console.log("Error: ", error);
                }

            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    adapter: MongoDBAdapter(clientPromise) as Adapter ,
}