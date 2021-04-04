import {
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Text,
	FormControl,
	FormLabel,
	NumberInput,
	NumberInputField,
	Button
} from "@chakra-ui/react";
import React from "react";
import { useFetch } from "../hooks/useFetch";
import { StockProfile } from "./PurchaseScreen";

export interface SellScreenProps {
	id: number;
}

const SellScreen: React.FC<SellScreenProps> = ({ id }) => {
	const { data, loading } = useFetch(`/api/stock?stock=${id}`);
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
			{userProfile ? (
				<FormControl id="stock-amount">
					<FormLabel>Enter amount to sell</FormLabel>
					<NumberInput max={userProfile.shares.total - userProfile!.shares.bought}>
						<NumberInputField />
					</NumberInput>
				</FormControl>
			) : (
				<Text>Loading...</Text>
			)}

			<Button colorScheme="red" my={3} disabled={loading}>
				Submit sell order
			</Button>
		</>
	);
};

export default SellScreen;
