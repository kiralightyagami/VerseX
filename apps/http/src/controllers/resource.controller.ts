import { Request, Response } from "express";
import client from "@repo/db/client";

export class ResourceController {
    static async getElements(req: Request, res: Response) {
        const elements = await client.element.findMany()

        res.json({elements: elements.map(e => ({
            id: e.id,
            imageUrl: e.imageUrl,
            width: e.width,
            height: e.height,
            static: e.static
        }))})
    }

    static async getAvatars(req: Request, res: Response) {
        const avatars = await client.avatar.findMany()
        res.json({avatars: avatars.map(x => ({
            id: x.id,
            imageUrl: x.imageUrl,
            name: x.name
        }))})
    }
} 