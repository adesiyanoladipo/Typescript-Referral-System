import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
    email: z.string({
        required_error: "Email is necessary",
        invalid_type_error: "Email is invalid"
    }),
    name: z.string({
        required_error: "Name is necessary",
        invalid_type_error: "Name is invalid"
    }),
    referralCode: z.string().length(5).optional(),
    referredBy: z.string().length(5).optional(),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
})

export type CreateUserInput = z.infer<typeof createUserSchema>

const createUserResponseSchema = z.object({
    ...userCore,
})

export const {schemas: userSchema, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema
})