import z from "zod";

export const SignupSchema = z.object({
    username: z.string(),
    password: z.string(),
    type: z.enum(["user", "admin"]),
})

export const SigninSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const UpdateMetadataSchema = z.object({
    avatarId: z.string()
})

export const CreateSpaceSchema = z.object({
    name: z.string(),
    dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    mapId: z.string().optional(),
})

export const DeleteElementSchema = z.object({
    id: z.string(),
})

export const AddElementSchema = z.object({
    spaceId: z.string(),
    elementId: z.string(),
    x: z.number(),
    y: z.number(),
})

export const CreateElementSchema = z.object({
    imageUrl: z.string(),
    width: z.number(),
    height: z.number(),
    static: z.boolean(),
})

export type Element = z.infer<typeof CreateElementSchema> & {
    id: string;
}

export const UpdateElementSchema = z.object({
    imageUrl: z.string(),
})

export const CreateAvatarSchema = z.object({
    imageUrl: z.string().nullable(),
    name: z.string().nullable()
})

export type Avatar = z.infer<typeof CreateAvatarSchema> & {
    id: string;
}

export const CreateMapSchema = z.object({
    thumbnail: z.string(),
    dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    name: z.string(),
    defaultElements: z.array(z.object({
        elementId: z.string(),
        x: z.number(),  
        y: z.number(),
    }))
})


declare global {
    namespace Express {
      export interface Request {
        role?: "Admin" | "User";
        userId?: string;
      }
    }
}