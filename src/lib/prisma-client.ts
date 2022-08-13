import { PrismaClient } from ".pnpm/@prisma+client@4.2.1_prisma@4.2.1/node_modules/.prisma/client";

declare global {
	// allow global `var` declarations
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

export const prisma =
	global.prisma ||
	new PrismaClient({
		log: ["query"],
	});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
