import * as React from "react";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link, Tooltip } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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
				//While waiting for cors policy to be fixed
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
						<Td>
							<Tooltip label="osu!profile">
								<Link href={`https://osu.ppy.sh/u/${user.username}`} isExternal>
									{user.username} <ExternalLinkIcon mx={"2px"} />
								</Link>
							</Tooltip>
						</Td>
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
