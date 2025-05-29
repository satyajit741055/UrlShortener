import { z } from "zod";

export const userType = z.object(
    {
        username: z
            .string()
            .trim()
            .min(2, { message: "Username must be at least 2 characters" })
            .max(20, { message: "Username cannot exceed 20 characters" }),
        email: z.string()
            .trim()
            .email({ message: "Invalid Email Address" }),
        password: z.string().min(6)
    }
)