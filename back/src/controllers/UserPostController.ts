import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class UserPostController {
  static async createUserPost(request: Request, response: Response) {
    try {
      const { clothName, postText } = request.body;

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

      if (user == null) {
        response.status(404).json({ message: "User Not Found" });
        return;
      }

      const userPostInput: Prisma.UserPostCreateManyInput = {
        userId: user.id,
        clothName: clothName,
        postText: postText,
      };

      const createdUserPost = await prisma.userPost.create({
        data: userPostInput,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              imgUrl: true,
            },
          },
        },
      });

      response.status(201).json(createdUserPost);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getUserPosts(request: Request, response: Response) {
    try {
      const { clothName } = request.body;
      const userEmail = request.user as string;

      if (!userEmail) {
        response.status(401).json({ message: "Unauthorized!" });
        return;
      }

      const userPosts = await prisma.userPost.findMany({
        where: {
          clothName: typeof clothName === "string" ? clothName : undefined,
          user: {
            email: typeof userEmail === "string" ? userEmail : undefined,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              imgUrl: true,
            },
          },
        },
      });

      response.status(200).json(userPosts);
    } catch (error: any) {
      response.status(500).json({ error: error.message });
    }
  }
  static async updateUserPost(request: Request, response: Response) {
    try {
      const { clothName, date, postText } = request.body;

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

      if (user == null) {
        response.status(404).json({ message: "User Not Found" });
        return;
      }

      const userPostInput: Prisma.UserPostUpdateInput = {
        postText: postText,
      };

      const updatedUserPost = await prisma.userPost.update({
        data: userPostInput,
        where: {
          userId_clothName_date: {
            clothName: clothName,
            date: date,
            userId: user.id,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              imgUrl: true,
            },
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
      const { clothName, date } = request.body;

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

      if (user == null) {
        response.status(404).json({ message: "User Not Found" });
        return;
      }

      const deletedUserPost = await prisma.userPost.delete({
        where: {
          userId_clothName_date: {
            userId: user.id,
            clothName: clothName,
            date: date,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              imgUrl: true,
            },
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
