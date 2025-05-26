"use server"
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma"

const client = new PrismaClient();
export async function signup(email: string, password: string) {
    try {
        const hashedPW = await bcrypt.hash(password, 4);
        const user = await client.user.create({
            data: {
                username: email.split("@")[0],
                email,
                password: hashedPW,
            }
        })
        return {
            user,
            msg: "Successfully created user",
            success: true
        }
    } catch (e) {
        return {
            e,
            msg: "Failed to created user",
            success: false
        }
    }
}

export async function signin(email: string, password: string) {
    try {
        const hashedPW = await bcrypt.hash(password, 4);
        const user = await client.user.findUnique({
            where: {
                email,
            }
        })

        if (user) {
            const isValidPw = await bcrypt.compare(password, hashedPW);
            if (isValidPw) {
                return {
                    user,
                    success: true
                }
            }
        } else {
            return {
                success: false,
                msg : "Invalid creds"
            }
        }

    } catch (e) {
        return {
            e,
            msg: "Failed to signin!",
            success: false
        }
    }
}