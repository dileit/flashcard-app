import React, { useEffect, useState } from "react";

import DeckTitle from "./DeckTitle";

import { listDecks } from "../utils/api/index.js";

function DeckList() {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		async function loadDecks() {
			const abortController = new AbortController();
			try {
				const getDecksFromAPI = await listDecks(abortController.signal);
				setDecks(getDecksFromAPI);
			} catch (error) {
				console.error("Something went wrong", error);
			}
			return () => abortController.abort();
		}
		loadDecks();
	}, []);

	const list = decks.map((deck) => <DeckTitle key={deck.id} deck={deck} />);

	return (
		<main className="decklist-container">
			<section className="row">
				<div className="deck-list">{list}</div>
			</section>
		</main>
	);
}

export default DeckList;
