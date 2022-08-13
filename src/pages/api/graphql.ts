import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema/schema";
import { createContext } from "../../graphql/context/context";
import Cors from "micro-cors";

const apolloServer = new ApolloServer({ schema, context: createContext });
const startServer = apolloServer.start();
const cors = Cors();

export default cors(async function graphqlHandler(req: any, res: any) {
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}

	await startServer;

	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res);
});

export const config = {
	api: {
		bodyParser: false,
	},
};
