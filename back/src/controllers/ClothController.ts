import { Prisma, PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";

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
  SANDALHA = 1.0,
  SALAPATO = 0.5,
  BOTA = 0.2,
}

export class ClothController {
  static async createCloth(request: Request, response: Response) {
    try {
      const { clothName, clothCategory, clothType, clothColor } = request.body;

      const userEmail = request.user as string;

      if (!userEmail) {
        response.status(401).json({ message: "Unauthorized!" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      const createClothInput: Prisma.ClothCreateInput = {
        clothName: clothName,
        user: {
          connect: {
            id: user?.id,
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
      const userEmail = request.user as string;

      if (!userEmail) {
        response.status(401).json({ message: "Unauthorized!" });
        return;
      }

      const clothes = await prisma.cloth.findMany({
        where: {
          user: {
            email: userEmail,
          },
        },
      });

      response.status(200).json(clothes);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getAllClothes(request: Request, response: Response) {
    try {
      const clothes = await prisma.cloth.findMany();

      response.status(200).json(clothes);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getCloth(request: Request, response: Response) {
    try {
      const { clothName } = request.body;

      const userEmail = request.user as string;

      if (!userEmail) {
        response.status(401).json({ message: "Unauthorized!" });
        return;
      }

      const cloth = await prisma.cloth.findUnique({
        where: {
          clothName: clothName,
          user: {
            email: userEmail,
          },
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
      const { clothName, clothCategory, clothType, clothColor } = request.body;

      const userEmail = request.user as string;

      if (!userEmail) {
        response.status(401).json({ message: "Unauthorized!" });
        return;
      }

      const updateClothInput: Prisma.ClothUpdateInput = {
        clothName: clothName,
        clothCategory: clothCategory,
        clothType: Number(clothType),
        clothColor: clothColor,
      };

      const clothToBeUpdated = await prisma.cloth.findUnique({
        where: {
          clothName: clothName,
          user: {
            email: userEmail,
          },
        },
      });
      if (!clothToBeUpdated) {
        response.status(404).json({ message: "Cloth Not Found" });
        return;
      }

      const updatedCLoth = await prisma.cloth.update({
        data: updateClothInput,
        where: {
          clothName: clothName,
          user: {
            email: userEmail,
          },
        },
      });

      response.status(200).json(updatedCLoth);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async deleteCloth(request: Request, response: Response) {
    try {
      const { clothName } = request.body;

      const userEmail = request.user as string;

      if (!userEmail) {
        response.status(401).json({ message: "Unauthorized!" });
        return;
      }

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
