import {
	Button,
	FormControl,
	FormLabel,
	Text,
	NumberInput,
	NumberInputField,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr
} from "@chakra-ui/react";
import React from "react";
import { useFetch } from "../hooks/useFetch";

export interface PurchaseScreenProps {
	id: number;
}

type StockProfile = {
	user: {
		user: {
			username: string;
			id: number;
		};
	};
	shares: {
		total: number;
		bought: number;
	};
	price: number;
};
const PurchaseScreen: React.FC<PurchaseScreenProps> = ({ id }) => {
	const { data, loading } = useFetch(`https://stocks.jmir.xyz/stock?stock=${id}`);
	const userProfile = data as StockProfile | null;

	return (
		<>
			<Table>
				<Thead>
					<Tr>
						<Th>User</Th>
						<Th>Total</Th>
						<Th>Bought</Th>
						<Th>Price</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>{userProfile?.user.user.username}</Td>
						<Td>{userProfile?.shares.total}</Td>
						<Td>{userProfile?.shares.bought}</Td>
						<Td>{userProfile?.price.toFixed(2)}</Td>
					</Tr>
				</Tbody>
			</Table>
			{!loading ? (
				<FormControl id="stock-amount">
					<FormLabel>Enter amount to purchase</FormLabel>
					<NumberInput max={userProfile!.shares.total - userProfile!.shares.bought}>
						<NumberInputField />
					</NumberInput>
				</FormControl>
			) : (
				<Text>Loading...</Text>
			)}

			<Button colorScheme="green" my={3} disabled={loading}>
				Submit Purchase
			</Button>
		</>
	);
};

export default PurchaseScreen;
