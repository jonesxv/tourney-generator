import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

class PoolGame extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			game: {}
		}
	}

	handleChange2 = (obj,pool,gamekey,event) => {
		const itemkey = obj
		let oppKey = ""
		Object.keys(this.props.game[0]).map(key => {
			if (key !== obj) {
				oppKey = key
			}
		})[0]
		console.log("oppkey",oppKey)
		const score = parseInt(event.currentTarget.value)
		this.props.updateScore(pool, gamekey, itemkey, oppKey, score)
	}

	handleChange = (pool,index,key,e) => {
		const score = e.currentTarget.value
		//this.props.updateScore(pool,index,key,score)
		const game = {...this.state.game}
		game[key] = score
		this.setState({ game })
		Object.values(this.props.game).map(val => {
			console.log("val",val)
		})
		
	}

	componentDidUpdate() {
		const num = Object.keys(this.state.game).length
		const game = {...this.state.game}
		if (num === 2) {
			const pool = this.props.pool
			const index = this.props.index
			const game = {...this.state.game}
			let lowScore = 0
			const winner = Object.keys(game).reduce((max,key) => {
				return (
					(max === undefined || parseInt(game[key]) > parseInt(game[max])) ? key : max
			)})
			const loser = Object.keys(game).filter(key => {
					return (key !== winner)
				})[0]
			const highScore = parseInt(game[winner])
			Object.keys(game).forEach(key => {
				if (key !== winner) {
					lowScore = parseInt(game[key])
				}
			})
			const diff = highScore - lowScore
			
			this.props.updateRecord(winner, loser, parseInt(diff))
		}
	}
	componentWillReceiveProps() {
		console.log("test")
	}
	render() {
		return (
			
			<table className="pool-game">
				<tbody>
					{Object.keys(this.props.game).map(key => {
						return (
							<tr>
								<td>{this.props.game[key].name}</td>
								<td>
								<input 
									key={key}
									name="name"
									type="text"
									onChange={e => this.handleChange(this.props.pool,this.props.index,key,e)}
								/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			
		)
	}
}

class Pool extends React.Component {


	componentDidMount() {
		console.log("mounted")
	}
	render() {

		const poolGamesComponents = Object.keys(this.props.games).map(key => {
			return (
				<PoolGame 
					pool={this.props.name}
					game={this.props.games[key]}
					index={key}
					key={key} 
					updateRecord={this.props.updateRecord}
				/>
			)
		})
		return (
			<div className="fds">
				<h2>{this.props.name}</h2>
				{poolGamesComponents}
			</div>
		)
	}
}

class PoolSchedule extends React.Component {
	
	render() {
		const poolComponents = Object.keys(this.props.field).map(key => (
			<Pool
				name={key}
				key={key}
				games={this.props.field[key].games}
				field={this.props.field[key]}
				updateRecord={this.props.updateRecord}
			/>
		))
		return (
			<div className="">
				<h2>{this.props.title}</h2>
				{poolComponents}
			</div>
		)
	}
}

export default PoolSchedule