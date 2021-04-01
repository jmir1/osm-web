import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link, Tooltip } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useFetch } from "../hooks/useFetch";
import TransactionButton from "./TransactionModal";

export interface OSMRankingsProps {}
type Ranking = {
	username: string;
	rank: number;
	pp: number;
	price: number;
	id: number;
};
const OSMRankings: React.FC<OSMRankingsProps> = () => {
	const { data } = useFetch("https://stocks.jmir.xyz/rankings");
	const rankings = data as Ranking[] | null;

	return (
		<Table>
			<Thead>
				<Tr>
					<Th>Username</Th>
					<Th>Rank</Th>
					<Th>PP</Th>
					<Th>Stock Price</Th>
					<Th>Buy/Sell</Th>
				</Tr>
			</Thead>
			<Tbody>
				{rankings ? (
					rankings.map((user, idx) => {
						return (
							<Tr key={idx}>
								<Td>
									<Tooltip label="osu!profile">
										<Link
											href={`https://osu.ppy.sh/users/${user.id}`}
											isExternal
										>
											{user.username} <ExternalLinkIcon mx={"2px"} />
										</Link>
									</Tooltip>
								</Td>
								<Td>{user.rank}</Td>
								<Td>{user.pp}</Td>
								<Td>${user.price.toFixed(2)}</Td>
								<Td>
									<TransactionButton
										type="buy"
										username={user.username}
										userID={user.id}
									/>
									<TransactionButton
										type="sell"
										username={user.username}
										userID={user.id}
									/>
								</Td>
							</Tr>
						);
					})
				) : (
					<Tr>Loading rankings...</Tr>
				)}
			</Tbody>
		</Table>
	);
};

export default OSMRankings;
