import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../Components/Home";
import CreateDeck from "../Components/CreateDeck";
import NotFound from "./NotFound";
import DeckView from "../Components/DeckView";
import EditDeck from "../Components/EditDeck";
import AddCard from "../Components/AddCard";
import EditCard from "../Components/EditCard";
import StudyView from "../Components/StudyView";

function Layout() {
	return (
		<>
			<Header />
			<div className="container">
				{/* TODO: Implement the screen starting here */}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/decks/new">
						<CreateDeck />
					</Route>
					<Route exact path="/decks/:deckId">
						<DeckView />
					</Route>
					<Route exact path="/decks/:deckId/edit">
						<EditDeck />
					</Route>
					<Route exact path="/decks/:deckId/study">
						<StudyView />
					</Route>
					<Route exact path="/decks/:deckId/cards/new">
						<AddCard />
					</Route>
					<Route exact path="/decks/:deckId/cards/:cardId/edit">
						<EditCard />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</>
	);
}

export default Layout;
