import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class UserController {
	static async createUser(request: Request, response: Response) {
		try {
			const { name, email, password } = request.body;

			const createdUser = await prisma.user.create({
				data: {
					name: name,
					email: email,
					hash: "qqweqeqwe",
					salt: "qweqweqwedasdasdij",
				},
			});
			response.status(201).json(createdUser);
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}

	static async getUsers(request: Request, response: Response) {
		try {
			const users = await prisma.user.findMany();

			response.status(200).json(users);
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}

	static async getUser(request: Request, response: Response) {
		try {
			const { id } = request.params;

			const user = await prisma.user.findUnique({
				where: { id: Number(id) },
			});

			if (user) {
				response.status(200).json(user);
			} else {
				response.status(404).json({ message: "User Not Found" });
			}
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}

	static async updateUser(request: Request, response: Response) {
		try {
			const { id, name, email, password } = request.body;

			const updatedUser = await prisma.user.update({
				data: {
					name: name,
					email: email,
					hash: "qqweqeqwe",
					salt: "qweqweqwedasdasdij",
				},
				where: {
					id: id,
				},
			});
			response.status(201).json(updatedUser);
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}

	static async deleteUser(request: Request, response: Response) {
		try {
			const { id } = request.params;

			const deletedUser = await prisma.user.delete({
				where: { id: Number(id) },
			});

			response.status(200).json(deletedUser)
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}


	static async deleteAllUsers(request: Request, response: Response) {
		try {
			const deletedUsers = await prisma.user.deleteMany();

			response.status(200).json(deletedUsers)
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}



}
