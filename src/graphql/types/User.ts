import { extendType, objectType, stringArg } from "nexus";
import { Product } from "./Product";

export const User = objectType({
	name: "User",
	definition(t) {
		t.nonNull.string("id"),
			t.string("firstName"),
			t.string("lastName"),
			t.string("email"),
			t.list.field("products", {
				type: Product,
				resolve: async (parent, _args, ctx) => {
					return await ctx.prisma.user
						.findUnique({
							where: {
								id: parent.id,
							},
						})
						.products();
				},
			});
	},
});

export const UserQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("users", {
			type: User,
			resolve: async (_parent, _args, ctx) => {
				return await ctx.prisma.user.findMany();
			},
		});
	},
});

export const OneUserQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("user", {
			type: User,
			args: {
				id: stringArg(),
			},
			resolve: async (_parent, args, ctx) => {
				return await ctx.prisma.user.findUnique({
					where: {
						id: args.id!,
					},
				});
			},
		});
	},
});
