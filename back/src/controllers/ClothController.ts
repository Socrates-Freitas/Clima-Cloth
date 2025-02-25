import { PrismaClient } from "@prisma/client";
import { warnEnvConflicts } from "@prisma/client/runtime/library";
import { json, Request, Response } from "express";

const prisma = new PrismaClient();

export enum ClothCategory {
	BLUSA = "BLUSA",
	CALCA = "CALÇA"
}



export class ClothController {
	static async createCloth(request: Request, response: Response) {
		try {
			const { clothName, userId, clothType, clothFabric, clothColor, imgageUrl: imageUrl } =
				request.body;


			const createdCloth = await prisma.cloth.create({
				data: {

					clothName: clothName,
					clothColor: Number(clothColor),
					clothType: Number(clothType),
					clothFabric: Number(clothFabric),
					imageUrl: imageUrl

				}
			}

		} catch (error: any) {
			response.status(201).json({ message: error.message });
		}
	}
}
