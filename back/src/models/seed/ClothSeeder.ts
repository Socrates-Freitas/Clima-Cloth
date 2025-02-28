import { PrismaClient, Prisma } from "@prisma/client";
import { fakerPT_BR } from "@faker-js/faker";
import { ClothCategory, ClothType } from "../../controllers/ClothController";
import { UserReturn } from "../../controllers/UserController";

export async function clothSeeder(
	maxNum: number,
	users: UserReturn[],
	prisma: PrismaClient,
) {
	for (let i = 0; i < users.length; i++) {
		const numClothes = Math.floor(Math.random() * (maxNum + 1)) + 1;
		let clothesInput: Prisma.ClothCreateInput[] = [];
		for (let j = 0; j < numClothes; j++) {
			const randomType = randomNumberEnum(ClothType);

			await prisma.cloth.create({
				data: {
					clothName: fakerPT_BR.company.name() + " " + fakerPT_BR.color.human(),
					user: {
						connect: {
							id: users[i].id,
						},
					},
					clothCategory: randomEnum(ClothCategory),
					clothType: randomType,
					clothColor: fakerPT_BR.color.rgb(),
				},
			});
		}
	}
}

function randomNumberEnum<T>(anEnum: T): T[keyof T] {
	// const enumValues = Object.values(anEnum) as T[keyof T][];
	  const enumValues = Object.values(anEnum).filter(value => typeof value === "number") as T[keyof T][];
	const index = Math.floor(Math.random() * enumValues.length);

	return enumValues[index];
}


function randomEnum<T>(anEnum: T): T[keyof T] {
	const enumValues = Object.values(anEnum) as T[keyof T][];
	const index = Math.floor(Math.random() * enumValues.length);

	return enumValues[index];
}
