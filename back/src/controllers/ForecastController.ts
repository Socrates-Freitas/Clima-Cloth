import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ForecastController {
  static async createForecast(request: Request, response: Response) {
    try {
      const {
        city,
        date,
        weather,
        temperature,
        rainProbabilty: rainProbability,
      } = request.body;

      const forecastInput: Prisma.ForecastCreateInput = {
        city: city,
        date: new Date(Number(date)),
        weather: weather,
        temperature: Number(temperature),
        rainProbability: Number(rainProbability),
      };

      const createdForecast = await prisma.forecast.create({
        data: forecastInput,
      });
      response.status(201).json(createdForecast);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getForecast(request: Request, response: Response) {
    try {
      const { forecastId } = request.params;
      const forecasts = await prisma.forecast.findMany({
        where: {
          id: Number(forecastId),
        },
      });
      response.status(201).json(forecasts);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async getForecasts(request: Request, response: Response) {
    try {
      const { date } = request.params;
      const forecasts = await prisma.forecast.findMany({
        where: {
          date: typeof date === "string" ? new Date(date) : undefined,
        },
      });
      response.status(201).json(forecasts);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async updateForecast(request: Request, response: Response) {
    try {
      const { forecastId, city, date, weather, temperature, rainProbabilty } =
        request.body;

      const forecastInput: Prisma.ForecastUpdateInput = {
        city: city,
        date: new Date(date),
        weather: weather,
        temperature: temperature,
        rainProbability: rainProbabilty,
      };

      const updatedForecast = await prisma.forecast.update({
        data: forecastInput,
        where: {
          id: Number(forecastId),
        },
      });
      response.status(200).json(updatedForecast);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async deleteForecast(request: Request, response: Response) {
    try {
      const { forecastId } = request.params;
      const deletedForecast = await prisma.forecast.delete({
        where: {
          id: Number(forecastId),
        },
      });
      response.status(200).json(deletedForecast);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  static async deleteAllForecasts(request: Request, response: Response) {
    try {
      const deletedForecasts = await prisma.forecast.deleteMany();
      response.status(200).json(deletedForecasts);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}
