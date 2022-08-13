import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";

const getAllUsers = gql`
	query {
		users {
			id
			firstName
			lastName
			email
		}
	}
`;

const Home: NextPage = () => {
	const { data, loading, error } = useQuery(getAllUsers);

	if (loading) return <p>Loading... </p>;
	if (error) return <p>Something gone wrong...{error.message}</p>;

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Home;
