import { Request, Response } from "express";
import { UpdateMetadataSchema } from "../types";
import client from "@repo/db/client";

export class UserController {
    static async updateMetadata(req: Request, res: Response) {
        const parsedData = UpdateMetadataSchema.safeParse(req.body)       
        if (!parsedData.success) {
            console.log("parsed data incorrect")
            res.status(400).json({message: "Validation failed"})
            return
        }
        try {
            await client.user.update({
                where: {
                    id: req.userId
                },
                data: {
                    avatarId: parsedData.data.avatarId
                }
            })
            res.json({message: "Metadata updated"})
        } catch(e) {
            res.status(400).json({message: "Internal server error"})
        }
    }

    static async getBulkMetadata(req: Request, res: Response) {
        const userIdString = (req.query.ids ?? "[]") as string;
        const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");
        console.log(userIds)
        const metadata = await client.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            },
            select: {
                avatar: true,
                id: true
            }
        })

        res.json({
            avatars: metadata.map(m => ({
                userId: m.id,
                avatarId: m.avatar?.imageUrl
            }))
        })
    }
} 