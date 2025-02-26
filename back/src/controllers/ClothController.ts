import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export enum ClothCategory {
  BLUSA = "BLUSA",
  CALCA = "CALÇA",
  CALCADO = "CALÇADO",
}

export enum ClothType {
  CALCA_LONGA = 0.2,
  CASACO = 0.2,
  CALCA_CAPRI = 0.5,
  MANGA_LONGA = 0.5,
  MANGA_CURTA = 0.6,
  REGATA = 1.0,
  VESTIDO = 0.6,
  BERMUDA = 0.6,
  SHORT = 1.0,
}

export class ClothController {
  static async createCloth(request: Request, response: Response) {
    try {
      const { clothName, userId, clothCategory, clothType, clothColor } =
        request.body;

      const createClothInput: Prisma.ClothCreateInput = {
        clothName: clothName,
        user: {
          connect: {
            id: Number(userId),
          },
        },
        clothCategory: clothCategory,
        clothType: Number(clothType),
        clothColor: clothColor,
      };

      const createdCloth = await prisma.cloth.create({
        data: createClothInput,
      });

      response.status(201).json(createdCloth);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getClothes(request: Request, response: Response) {
    try {
      const { userId } = request.body;

      const clothes = await prisma.cloth.findMany({
        where: {
          userId: typeof userId === "string" ? Number(userId) : undefined,
        },
      });

      response.status(200).json(clothes);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getCloth(request: Request, response: Response) {
    try {
      const { userId, clothName } = request.body;

      const cloth = await prisma.cloth.findUnique({
        where: {
          userId: Number(userId),
          clothName: clothName,
        },
      });

      if (!cloth) {
        response.status(404).json({ message: "Cloth Not Fount" });
        return;
      }

      response.status(200).json(cloth);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async updateCloth(request: Request, response: Response) {
    try {
      const { clothName, userId, clothCategory, clothType, clothColor } =
        request.body;

      const updateClothInput: Prisma.ClothUpdateInput = {
        clothName: clothName,
        clothCategory: clothCategory,
        clothType: Number(clothType),
        clothColor: clothColor,
      };

      const clothToBeUpdated = await prisma.cloth.findUnique({
        where: {
          userId: Number(userId),
          clothName: clothName,
        },
      });
      if (!clothToBeUpdated) {
        response.status(404).json({ message: "Cloth Not Found" });
        return;
      }

      const updatedCLoth = await prisma.cloth.update({
        data: updateClothInput,
        where: {
          userId: Number(userId),
          clothName: clothName,
        },
      });

      response.status(200).json(updatedCLoth);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async deleteCloth(request: Request, response: Response) {
    try {
      const { userId, clothName } = request.body;

      const deletedCloth = await prisma.cloth.delete({
        where: {
          clothName: clothName,
        },
      });
      response.status(200).json(deletedCloth);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async deleteClothes(request: Request, response: Response) {
    try {
      const { userId } = request.body;
      const deletedCloth = await prisma.cloth.deleteMany({
        where: {
          userId: typeof userId === "string" ? Number(userId) : undefined,
        },
      });
      response.status(200).json(deletedCloth);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}
