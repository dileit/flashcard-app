import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardFormat from "./CardFormat";

function EditCard() {
	const initialCardState = {
		id: "",
		front: "",
		back: "",
		deckId: "",
	};
	const initialDeckState = {
		id: "",
		name: "",
		description: "",
	};
	const [cardState, setCardState] = useState(initialCardState);
	const [deckState, setDeckState] = useState(initialDeckState);
	const { deckId, cardId } = useParams();
	const history = useHistory();

	useEffect(() => {
		async function loadData() {
			const abortController = new AbortController();
			try {
				const readCardFromAPI = await readCard(cardId, abortController.signal);
				const readDeckFromAPI = await readDeck(deckId, abortController.signal);
				setCardState(readCardFromAPI);
				setDeckState(readDeckFromAPI);
			} catch (error) {
				console.error("Something went wrong", error);
			}
			return () => abortController.abort();
		}
		loadData();
	}, [cardId, deckId]);

	async function handleSubmit(e) {
		e.preventDefault();
		const abortController = new AbortController();
		const response = await updateCard({ ...cardState }, abortController.signal);
		history.push(`/decks/${deckId}`);
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
							<Link to={`/decks/${deckId}`}>{deckState.name}</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							{`Edit Card ${cardId}`}
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

export default EditCard;
