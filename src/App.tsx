import * as React from "react";
import { ChakraProvider, Box, VStack, Grid, theme, Heading, Center } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import OSMRankings from "./components/OSMRankings";

export const App = () => (
	<ChakraProvider theme={theme}>
		<Center>
			<Box textAlign="center" fontSize="xl">
				<Grid minH="100vh" p={3}>
					<ColorModeSwitcher justifySelf="flex-end" />
					<VStack spacing={8}>
						<Heading>Rankings</Heading>
						<OSMRankings />
					</VStack>
				</Grid>
			</Box>
		</Center>
	</ChakraProvider>
);
