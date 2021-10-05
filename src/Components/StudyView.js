import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function StudyView() {
	const { deckId } = useParams();
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);
	const [cardNumber, setCardNumber] = useState(1);
	const [front, setFront] = useState(true);
	const history = useHistory();

	// list deck + store
	useEffect(() => {
		async function loadDeck() {
			const abortController = new AbortController();
			const getDeckFromAPI = await readDeck(deckId, abortController.signal);
			setDeck(getDeckFromAPI);
			setCards(getDeckFromAPI.cards);
			return () => {
				abortController.abort();
			};
		}
		loadDeck();
	}, [deckId]);

	function nextCardHandler(index, total) {
		if (index < total) {
			setCardNumber(cardNumber + 1);
			setFront(true);
		} else {
			if (
				window.confirm(
					`Restart Cards? click 'cancel' to return to the home page`
				)
			) {
				setCardNumber(1);
				setFront(true);
			} else {
				history.push("/");
			}
		}
	}

	function flipCardHandler() {
		if (front) {
			setFront(false);
		} else {
			setFront(true);
		}
	}

	function showNextButton(cards, index) {
		if (front) {
			return null;
		} else {
			return (
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => nextCardHandler(index + 1, cards.length)}
				>
					Next
				</button>
			);
		}
	}

	function enoughCards() {
		return (
			<div className="card">
				{cards.map((card, index) => {
					if (index === cardNumber - 1) {
						return (
							<div className="card-body" key={card.id}>
								<div className="card-title">
									{`Card ${index + 1} of ${cards.length}`}
								</div>
								<div className="card-text">
									{front ? card.front : card.back}
								</div>
								<button
									onClick={flipCardHandler}
									className="btn btn-secondary mx-1"
								>
									Flip
								</button>
								{showNextButton(cards, index)}
							</div>
						);
					} else {
						return null;
					}
				})}
			</div>
		);
	}

	function notEnoughCards() {
		return (
			<div>
				<h2>Not enough cards.</h2>
				<p>
					You need at least 3 cards to study. There are {cards.length} cards in
					this deck.
				</p>
				<Link
					to={`/decks/${deck.id}/cards/new`}
					className="btn btn-primary m1-3"
				>
					+ Add Cards
				</Link>
			</div>
		);
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
							Study
						</li>
					</ol>
				</nav>
			</div>
			<div>
				<h2>Study: {deck.name}</h2>
				<div>
					{cards.length === 0
						? notEnoughCards()
						: cards.length > 2
						? enoughCards()
						: notEnoughCards()}
				</div>
			</div>
		</div>
	);
}

export default StudyView;
