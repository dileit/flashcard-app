import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";

import CardFormat from "./CardFormat";

function AddCard() {
	const initialCardState = {
		front: "",
		back: "",
	};
	const [deck, setDeck] = useState({});
	const [cardState, setCardState] = useState({ ...initialCardState });
	const history = useHistory();
	const { deckId } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		async function loadDeck() {
			const getDeckFromAPI = await readDeck(deckId, abortController.signal);
			setDeck(getDeckFromAPI);
		}
		loadDeck();
		return () => abortController.abort();
	}, [deckId]);

	async function handleSubmit(e) {
		e.preventDefault();
		const abortController = new AbortController();
		const response = await createCard(
			deckId,
			{ ...cardState },
			abortController.signal
		);
		history.go(0);
		setCardState(initialCardState);
		// history.push(`/decks/${deckId}`);
		return response;
	}

	const handleChange = (e) => {
		setCardState({ ...cardState, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item">
							<Link to={`/decks/${deckId}`}>{deck.name}</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Add Card
						</li>
					</ol>
				</nav>
			</div>

			<div>
				<CardFormat
					front={cardState.front}
					back={cardState.back}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
}

export default AddCard;
