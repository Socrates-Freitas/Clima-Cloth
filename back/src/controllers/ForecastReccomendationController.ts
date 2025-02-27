import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ClothCategory } from "./ClothController";

const prisma = new PrismaClient();

type Forecast = {
  id: number;
  city: string;
  date: Date;
  weather: string;
  temperature: number;
  rainProbability: number;
};

export class ForecastReccomendationController {
  static async createForecastReccomendation(
    request: Request,
    response: Response,
  ) {
    try {
      const { userId, forecastId, clothName } = request.body;

      const forecastInfo = await prisma.forecast.findUnique({
        where: { id: Number(forecastId) },
      });

      const forecastReccomendationInput: Prisma.ForecastClothReccomendationCreateInput =
        {
          cloth: {
            connect: { clothName: clothName },
          },
          forecast: {
            connect: { id: Number(forecastId) },
          },
          user: {
            connect: { id: Number(userId) },
          },
        };

      const createdForecastReccomendation =
        await prisma.forecastClothReccomendation.create({
          data: forecastReccomendationInput,
        });

      response.status(201).json(createdForecastReccomendation);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }

  static async createFullSetForecastReccomendation(
    request: Request,
    response: Response,
  ) {
    try {
      const { userId, forecastId } = request.body;

      const forecastInfo: Forecast | null = await prisma.forecast.findUnique({
        where: { id: Number(forecastId) },
      });

      if (forecastInfo == null) {
        response.status(404).json({ message: "Forecast Not Found!" });
        return;
      }
      const optimalClothNames =
        await ForecastReccomendationController.getOptimalClothAttributeFromForecast(
          Number(userId),
          forecastInfo,
        );

      const setReccomendationInput = optimalClothNames.map(
        (clothName: string) => {
          return {
            clothName: clothName,
            forecastId: forecastId,
            userId: userId,
          };
        },
      );

      const fullSetReccomendation =
        await prisma.forecastClothReccomendation.createManyAndReturn({
          data: setReccomendationInput,
          include: {
            user: true,
            forecast: true,
          },
        });

      response.status(200).json(fullSetReccomendation);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getForecastReccomendations(
    request: Request,
    response: Response,
  ) {
    try {
      const { userId, clothName, forecastId } = request.body;

      const reccomendedForecasts =
        await prisma.forecastClothReccomendation.findMany({
          where: {
            userId: typeof userId === "string" ? Number(userId) : undefined,
            clothName: typeof clothName === "string" ? clothName : undefined,
            forecastId:
              typeof forecastId === "string" ? Number(forecastId) : undefined,
          },
          include: {
            user: true,
            forecast: true,
          },
        });

      response.status(200).json(reccomendedForecasts);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }

  static async updateForecastReccomendation(
    request: Request,
    response: Response,
  ) {
    try {
      const { userId, clothName, forecastId } = request.body;

      const forecastReccomendationInput: Prisma.ForecastClothReccomendationUpdateInput =
        {
          cloth: {
            connect: { clothName: clothName },
          },
          forecast: {
            connect: { id: Number(forecastId) },
          },
          user: {
            connect: { id: Number(userId) },
          },
        };

      const updatedForecastReccomendation =
        await prisma.forecastClothReccomendation.update({
          data: forecastReccomendationInput,
          where: {
            clothName_forecastId: {
              clothName: clothName,
              forecastId: Number(forecastId),
            },
          },
          include: {
            user: true,
            forecast: true,
          },
        });

      response.status(200).json(updatedForecastReccomendation);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }
  static async deleteForecastReccomendation(
    request: Request,
    response: Response,
  ) {
    try {
      const { forecastId, clothName } = request.body;

      const deletedForecastReccomendation =
        await prisma.forecastClothReccomendation.delete({
          where: {
            clothName_forecastId: {
              clothName: clothName,
              forecastId: Number(forecastId),
            },
          },
        });

      response.status(200).json(deletedForecastReccomendation);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }
  static async deleteAllForecastReccomendation(
    request: Request,
    response: Response,
  ) {
    try {
      const deletedForecastReccomendation =
        await prisma.forecastClothReccomendation.deleteMany();

      response.status(200).json(deletedForecastReccomendation);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }

  private static async getOptimalClothAttributeFromForecast(
    userId: number,
    forecast: Forecast,
  ): Promise<string[]> {
    const optimalKindOfCloth = forecast.temperature / 45;
    let optimalClothNames: string[] = [];

    const allShirtsFromUser = await prisma.cloth.findMany({
      where: { userId: userId, clothCategory: ClothCategory.BLUSA },
      select: { clothCategory: true, clothName: true, clothType: true },
    });
    optimalClothNames.push(
      this.getBestClothNameFromArray(allShirtsFromUser, optimalKindOfCloth),
    );

    const allPantsFromUser = await prisma.cloth.findMany({
      where: { userId: userId, clothCategory: ClothCategory.CALCA },
      select: { clothCategory: true, clothName: true, clothType: true },
    });

    optimalClothNames.push(
      this.getBestClothNameFromArray(allPantsFromUser, optimalKindOfCloth),
    );

    const allShoesFromUser = await prisma.cloth.findMany({
      where: { userId: userId, clothCategory: ClothCategory.CALCADO },
      select: { clothCategory: true, clothName: true, clothType: true },
    });
    optimalClothNames.push(
      this.getBestClothNameFromArray(allShoesFromUser, optimalKindOfCloth),
    );

    return optimalClothNames;
  }

  private static getBestClothNameFromArray(
    clothes: { clothCategory: string; clothName: string; clothType: number }[],
    optimal: number,
  ): string {
    let optimalClothName = "";

    let minimalDifference = 0.2;
    for (let i in clothes) {
      const distance = Math.abs(optimal - clothes[i].clothType);
      if (distance < minimalDifference) {
        minimalDifference = distance;
        optimalClothName = clothes[i].clothName;
      }
    }

    return optimalClothName;
  }
}
