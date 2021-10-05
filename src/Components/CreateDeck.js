import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
	const history = useHistory();
	const [newDeck, setNewDeck] = useState({ name: "", description: "" });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await createDeck(newDeck);
		history.push(`/decks/${response.id}`);
	};

	const handleChange = (e) => {
		setNewDeck({ ...newDeck, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Create Deck
						</li>
					</ol>
				</nav>
			</div>

			<div>
				<form onSubmit={handleSubmit}>
					<h2>Create Deck</h2>
					<div className="form-group">
						<label className="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Deck Name"
							onChange={handleChange}
							value={newDeck.name}
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
							value={newDeck.description}
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
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateDeck;
