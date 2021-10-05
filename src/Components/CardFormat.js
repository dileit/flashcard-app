import React from "react";
import { useHistory } from "react-router-dom";

function CardFormat({ front, back, handleChange, handleSubmit }) {
	const history = useHistory();

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="exampleFormControlTextarea1">Front</label>
					<textarea
						id="front"
						name="front"
						className="form-control"
						rows="3"
						value={front}
						onChange={handleChange}
					></textarea>
				</div>
				<div className="form-group">
					<label className="exampleFormControlTextarea1">Back</label>
					<textarea
						id="back"
						name="back"
						className="form-control"
						rows="3"
						value={back}
						onChange={handleChange}
					></textarea>
				</div>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={() => history.push("/")}
				>
					Done
				</button>
				<button type="submit" className="btn btn-primary">
					Save
				</button>
			</form>
		</>
	);
}

export default CardFormat;
