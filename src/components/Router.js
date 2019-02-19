import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TournamentStart from './TournamentStart'
import App from './App'
import Bracket from './Bracket'
import NotFound from './NotFound'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={TournamentStart} />
			<Route path="/tournament/:tournament" component={App} />
			<Route path="/tournament/:tournament/bracket" componnet={Bracket} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default Router