import * as React from "react";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

export interface OSMRankingsProps {}

type Ranking = {
	username: string;
	rank: number;
	pp: number;
	price: number;
};

const OSMRankings: React.FC<OSMRankingsProps> = () => {
	const [rankings, setRankings] = useState<Ranking[]>([]);

	const demodata: Ranking[] = require("./demodata.json");

	useEffect(() => {
		fetch("https://stocks.jmir.xyz/rankings", { method: "GET", mode: "no-cors" })
			.then((res) => {
				console.dir(res);

				return res.json();
			})
			.then((data) => {
				console.log(data);
				if (data) {
					setRankings(data);
				}
			})
			.catch((e) => {
				console.error(e);
				setRankings(demodata);
			});
	}, [demodata]);

	return (
		<Table>
			<Thead>
				<Tr>
					<Th>Username</Th>
					<Th>Rank</Th>
					<Th>PP</Th>
					<Th>Stock Price</Th>
				</Tr>
			</Thead>
			<Tbody>
				{rankings.map((user, idx) => (
					<Tr key={idx}>
						<Td>{user.username}</Td>
						<Td>{user.rank}</Td>
						<Td>{user.pp}</Td>
						<Td>${user.price.toFixed(2)}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default OSMRankings;
