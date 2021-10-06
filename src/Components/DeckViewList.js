import React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

function DeckViewList({ key, card }) {
	const { deckId } = useParams();
	const history = useHistory();

	async function deleteCardHandler(card, e) {
		const result = window.confirm(
			`Delete this card? You will lose it forever.`
		);

		if (result) {
			const abortController = new AbortController();

			try {
				e.preventDefault();
				history.go(`/decks/${deckId}`);
				return await deleteCard(card.id, abortController.signal);
			} catch (error) {
				console.error("Something went wrong", error);
			}
			return () => {
				abortController.abort();
			};
		}
	}

	return (
		<div className="card" key={key}>
			<div className="card-body">
				<div className="row-card-body">
					<p className="card-text">{card.front}</p>
					<p className="card-text">{card.back}</p>
				</div>
				<Link
					to={`/decks/${deckId}/cards/${card.id}/edit`}
					className="btn btn-secondary"
				>
					Edit
				</Link>
				<button
					className="btn btn-danger"
					onClick={(e) => deleteCardHandler(card, e)}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default DeckViewList;
