import { PrismaClient, Prisma } from "@prisma/client";
import { fakerPT_BR } from "@faker-js/faker";
import auth from "../../config/auth";
import { UserReturn } from "../../controllers/UserController";

export async function userSeeder(
	num: number,
	prisma: PrismaClient,
): Promise<UserReturn[]> {
	let usersInput: Prisma.UserCreateInput[] = [];

	for (let i = 0; i < num; i++) {
		const password = fakerPT_BR.internet.password();
		const { hash, salt } = auth.generatePassword(password);
		usersInput.push({
			name: fakerPT_BR.person.fullName(),
			email: fakerPT_BR.internet.email(),
			hash: hash,
			salt: salt,
		});
	}

	const createdUsers = await prisma.user.createManyAndReturn({ data: usersInput });

	return createdUsers;
}
