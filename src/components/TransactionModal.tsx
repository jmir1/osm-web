import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from "@chakra-ui/react";
import React from "react";
import PurchaseScreen from "./PurchaseScreen";
import SellScreen from "./SellScreen";

export interface TransactionButtonProps {
	username: string;
	userID: number;
	type: "buy" | "sell";
}

const TransactionButton: React.FC<TransactionButtonProps> = ({ username, userID, type }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button
				onClick={onOpen}
				type="button"
				variant="outline"
				colorScheme={type === "buy" ? "green" : "red"}
			>
				{type.toLocaleUpperCase()}
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{username} Stock</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{type === "buy" ? (
							<PurchaseScreen id={userID} />
						) : (
							<SellScreen id={userID} />
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default TransactionButton;
