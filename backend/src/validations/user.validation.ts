import { z } from "zod"


export const userType = z.object(
    {
        username: z.string().min(2).max(20).trim(),
        email: z.string().email({message : "Invalid Email Address"}),
        password : z.string().min(6)
    }
)