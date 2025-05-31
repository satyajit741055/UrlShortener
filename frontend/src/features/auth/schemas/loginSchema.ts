import { z } from "zod";

export const loginType = z.object(
    {
        email: z.string()
            .trim()
            .email({ message: "Invalid Email Address" }).toLowerCase(),
        password: z.string().min(6)
    }
)