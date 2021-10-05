import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckTitle({ deck }) {
	const history = useHistory();

	const deleteHandler = async (deck) => {
		const result = window.confirm(
			`Delete this deck? You will not be able to recover it.`
		);

		if (result) {
			const abortController = new AbortController();

			try {
				history.go("0");
				return await deleteDeck(deck.id, abortController.signal);
			} catch (error) {
				console.error("Something went wrong", error);
			}
			return () => {
				abortController.abort();
			};
		}
	};

	return (
		<div className="card" key={deck.id}>
			<div className="card-body">
				<h5 className="card-title">{deck.name}</h5>
				<h6 className="card-subtitle mb-2 text-muted">
					{deck.cards.length} cards
				</h6>
				<p className="card-text">{deck.description}</p>
				<Link to={`/decks/${deck.id}`} className="btn btn-secondary">
					View
				</Link>
				<Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
					Study
				</Link>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => deleteHandler(deck)}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default DeckTitle;
