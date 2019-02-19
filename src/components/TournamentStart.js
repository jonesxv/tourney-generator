import React from 'react'

class TournamentStart extends React.Component {
	constructor(props) {
		super(props)

		this.goToTournament = this.goToTournament.bind(this)
	}

	goToTournament(event) {
		event.preventDefault()
		const tournamentName = this.inputName.value
		this.props.history.push(`tournament/${tournamentName}`)
	}

	componentDidMount() {
		console.log(this)
	}

	render() {
		return (
			<div className="tournament-start">
				<div className="form">
					<form className="tournament-form" onSubmit={this.goToTournament}>
						<h2>Tournament Generator</h2>
						<input type="text" ref={a => this.inputName = a} required placeholder="Enter Tournament Name" />
						<select id="country" name="country">
      						<option value="format">Select Format</option>
      						<option value="KOB">King of the Beach</option>
      						<option value="teams">Teams</option>
    					</select>
    					<input type="text" placeholder="Number of Items" />
    					<input type="text" placeholder="Items per pool" />
    					<label htmlFor="input-file">Upload Participant List</label>
    					<input id="input-file" type="file" />
  						<button>Submit</button>
					</form>
				</div>
			</div>
		)
	}
}

export default TournamentStart