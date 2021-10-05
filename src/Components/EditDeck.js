import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
	const initDeckState = {
		id: "",
		name: "",
		description: "",
	};
	const [deck, setDeck] = useState([]);
	const [deckState, setDeckState] = useState({ ...initDeckState });
	const { deckId } = useParams();
	const history = useHistory();

	useEffect(() => {
		const abortController = new AbortController();
		async function loadDeck() {
			const getDeckFromAPI = await readDeck(deckId, abortController.signal);
			setDeck(getDeckFromAPI);
			setDeckState({
				id: getDeckFromAPI.id,
				name: getDeckFromAPI.name,
				description: getDeckFromAPI.description,
			});
		}
		loadDeck();
		return () => abortController.abort();
	}, [deckId]);

	const handleChange = (e) => {
		setDeckState({ ...deckState, [e.target.name]: e.target.value });
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const abortController = new AbortController();
		const response = await updateDeck({ ...deckState }, abortController.signal);
		history.push(`/decks/${deckId}`);
		return response;
	}

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
							Edit Deck
						</li>
					</ol>
				</nav>
			</div>

			<div>
				<form onSubmit={handleSubmit}>
					<h2>Edit Deck</h2>
					<div className="form-group">
						<label className="name">Name</label>
						<input
							type="text"
							id="name"
							placeholder="Deck Name"
							onChange={handleChange}
							value={deckState.name}
							style={{ width: "100%" }}
						></input>
					</div>

					<div className="form-group">
						<label className="description">Description</label>
						<textarea
							name="description"
							id="description"
							type="textarea"
							rows="3"
							placeholder="Brief description of your deck"
							onChange={handleChange}
							value={deckState.description}
							style={{ width: "100%" }}
						></textarea>
					</div>
					<button
						type="button"
						className="btn btn-secondary"
						onClick={() => history.push("/")}
					>
						Cancel
					</button>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default EditDeck;
