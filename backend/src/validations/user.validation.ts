import { z } from "zod"


export const userType = z.object(
    {
        username: z.string().min(2).max(20).trim(),
        email: z.string().email({message : "Invalid Email Address"}).toLowerCase(),
        password : z.string().min(6)
    }
)


export const loginType = z.object(
    {
        email: z.string().email({message : "Invalid Email Address"}).toLowerCase(),
        password : z.string().min(6)
    }
)