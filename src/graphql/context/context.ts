import { PrismaClient } from ".pnpm/@prisma+client@4.2.1_prisma@4.2.1/node_modules/.prisma/client";
import { prisma } from "../../lib/prisma-client";

export type Context = {
	prisma: PrismaClient;
};

export async function createContext(req: any, res: any): Promise<Context> {
	return {
		prisma,
	};
}
