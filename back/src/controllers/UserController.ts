import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import auth from "../config/auth";

const prisma = new PrismaClient();

export type UserReturn = {
	id: number;
	name: string;
	email: string;
	hash: string;
	salt: string;
	imgUrl: string;
};

export class UserController {
	static async createUser(request: Request, response: Response) {
		try {
			const { name, email, password } = request.body;

			const { hash, salt } = auth.generatePassword(password);

			const createdUser: UserReturn = await prisma.user.create({
				data: {
					name: name,
					email: email,
					hash: hash,
					salt: salt,
				},
			});
			response.status(201).json(createdUser);
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}

	static async login(request: Request, response: Response) {
		try {
			const { email, password } = request.body;

			const foundUser = await prisma.user.findUnique({
				where: {
					email: email,
				},
			});

			if (!foundUser) {
				response.status(404).json({ message: "User not found" });
				return;
			}

			const passVerification = auth.checkPassword(
				password,
				foundUser.hash,
				foundUser.salt,
			);

			if (passVerification == false) {
				response.status(401).json({ message: "Invalid Password" });
				return;
			}

			const token = auth.generateJWT(foundUser);

			response.status(200).json({ token: token });
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
			const { id, name, email } = request.body;

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

			response.status(200).json(deletedUser);
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}

	static async deleteAllUsers(request: Request, response: Response) {
		try {
			const deletedUsers = await prisma.user.deleteMany();

			response.status(200).json(deletedUsers);
		} catch (error: any) {
			response.status(500).json({ error: error.message });
		}
	}
}
