import { objectType, extendType } from "nexus";
import { User } from "./User";

export const Product = objectType({
	name: "Product",
	definition(t) {
		t.nonNull.string("id"),
			t.string("name"),
			t.float("price"),
			t.int("quantity"),
			t.list.field("users", {
				type: User,
				resolve: async (parent, _args, ctx) => {
					return await ctx.prisma.product
						.findUnique({
							where: {
								id: parent.id,
							},
						})
						.users();
				},
			});
	},
});

export const ProductQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("products", {
			type: Product,
			resolve: async (_parent, _args, ctx) => {
				return await ctx.prisma.product.findMany();
			},
		});
	},
});
