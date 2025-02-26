import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class UserPostController {
  static async createUserPost(request: Request, response: Response) {
    try {
      const { userId, clothName, postText } = request.body;

      const userPostInput: Prisma.UserPostCreateManyInput = {
        userId: Number(userId),
        clothName: clothName,
        postText: postText,
      };

      const createdUserPost = await prisma.userPost.create({
        data: userPostInput,
      });

      response.status(201).json(createdUserPost);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getUserPosts(request: Request, response: Response) {
    try {
      const { userId, clothName } = request.body;

      const userPosts = await prisma.userPost.findMany({
        where: {
          userId: typeof userId === "string" ? Number(userId) : undefined,
          clothName: typeof clothName === "string" ? clothName : undefined,
        },
      });

      response.status(200).json(userPosts);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }
  static async updateUserPost(request: Request, response: Response) {
    try {
      const { userId, clothName, date, postText } = request.body;

      const userPostInput: Prisma.UserPostUpdateInput = {
        postText: postText,
      };

      const updatedUserPost = await prisma.userPost.update({
        data: userPostInput,
        where: {
          userId_clothName_date: {
            userId: Number(userId),
            clothName: clothName,
            date: date,
          },
        },
      });

      response.status(200).json(updatedUserPost);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }

  static async deleteUserPost(request: Request, response: Response) {
    try {
      const { userId, clothName, date } = request.body;

      const deletedUserPost = await prisma.userPost.delete({
        where: {
          userId_clothName_date: {
            userId: Number(userId),
            clothName: clothName,
            date: date,
          },
        },
      });
      response.status(200).json(deletedUserPost);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }

  static async deleteAllUserPosts(request: Request, response: Response) {
    try {
      const deletedUserPosts = await prisma.userPost.deleteMany();
      response.status(200).json(deletedUserPosts);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }
}
