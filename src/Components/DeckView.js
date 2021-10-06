import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";

import DeckViewList from "./DeckViewList";

function DeckView() {
	const [deck, setDeck] = useState([]);
	const { deckId } = useParams();
	const history = useHistory();

	useEffect(() => {
		const abortController = new AbortController();
		async function loadDeck() {
			const getDeckFromAPI = await readDeck(deckId, abortController.signal);
			setDeck(getDeckFromAPI);
		}
		loadDeck();
		return () => abortController.abort();
	}, [deckId]);

	async function deleteDeckHandler(deck, e) {
		if (
			window.confirm(`Delete this deck? You will not be able to recover it`)
		) {
			const abortController = new AbortController();
			try {
				e.preventDefault();
				history.push("/");
				return await deleteDeck(deck.id, abortController.signal);
			} catch (error) {
				console.error("Something went wrong", error);
			}
			return () => {
				abortController.abort();
			};
		}
	}

	const cardList =
		deck.cards &&
		deck.cards.map((card) => <DeckViewList key={card.id} card={card} />);

	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item active" aria-current="page">
						{deck.name}
					</li>
				</ol>
			</nav>

			<div>
				<h3>{deck.name}</h3>
				<p>{deck.description}</p>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={() => history.push(`/decks/${deckId}/edit`)}
				>
					Edit
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => history.push(`/decks/${deckId}/study`)}
				>
					Study
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => history.push(`/decks/${deckId}/cards/new`)}
				>
					+ Add Cards
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={(e) => deleteDeckHandler(deck, e)}
				>
					Delete
				</button>
			</div>
			<div>{cardList}</div>
		</div>
	);
}

export default DeckView;
