import { Prisma, PrismaClient } from "@prisma/client";
import { fakerPT_BR } from "@faker-js/faker";
import { userSeeder } from "./UserSeeder";
import { clothSeeder } from "./ClothSeeder";

const prisma = new PrismaClient();

async function main() {
	await prisma.$connect;
	const createdUsers = await userSeeder(20,prisma)

	await clothSeeder(5,createdUsers,prisma)
}

main()
	.then(async () => {
		await prisma.$disconnect;
	})
	.catch(async (error: any) => {
		console.log(error);
		await prisma.$disconnect;
	});
