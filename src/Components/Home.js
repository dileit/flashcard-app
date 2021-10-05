import React from "react";
import { useHistory } from "react-router-dom";

import DeckList from "./DeckList";

function Home() {
	const history = useHistory();

	return (
		<>
			<button
				type="button"
				className="btn btn-secondary"
				onClick={() => history.push("/decks/new")}
			>
				+ Create Deck
			</button>
			<DeckList />
		</>
	);
}

export default Home;
