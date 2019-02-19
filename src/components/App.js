import React from 'react'
import TourneyList from './TourneyList'
//import TournamentStart from './TournamentStart'
import Bracket from './Bracket'
import Pools from './Pools'
import PoolSchedule from './PoolSchedule'
import { Container, Col, Row } from 'reactstrap'
import ItemData from './ItemData'
import base from '../base'


class App extends React.Component {
	state = {
		players: {},
		teams: {},
		items: {},
		pools: {
			amount: 0,
			field: {}
			}
		
	}
//	componentDidMount() {
//		const { params } = this.props.match
//		this.ref = base.syncState(`${params.tournament}/items`, {
//			context: this,
//			state: "items"
//		})
//
//	}
//
//	componentDidUpdate() {
//		console.log(this.state.pools)
//	}
//
//	componentWillUnmount() {
//		base.removeBinding(this.ref)
//
//	}

	addItem = item => {
		const items = {...this.state.items}

		items[`item${Date.now()}`] = item

		this.setState({ items })

	}

	removeItem = item => {
		const items = {...this.state.items}

		delete items[item]

		this.setState({ items })
	}

	updateNumberPools = x => {
		const pools = {...this.state.pools}
		console.log(pools)
		pools.amount = x
		this.setState({ pools })
	}


	addList = itemList => {
		const itemArr = itemList.split(/\n/)
		console.log(itemArr)
		const items = {...this.state.items}
		itemArr.forEach((v,i,_) => {
			items[i] = {
				name: v
			}
		})
		this.setState({ items })
	}

	loadItemList = () => {
		const items = {}
		ItemData.map(item => {
			items[item.name] = {}
		})
		this.setState({ items })
	}

	createPools = (num) => {
		const pools = {}
		const items = {...this.state.items}
		pools.amount = num
		pools.field = {}
		for (let i=0; i<num; i++) {
			let newItems = {}
			let poolGames = {}
			let itemsTemp = {}
			let counter = 0
			let poolString = `Pool${String.fromCharCode(65+i)}`
			pools.field[poolString] = {}
			
			let itemKeys = Object.keys(items).filter((_, index, Arr) => (index +i) % num === 0)
			itemKeys.map(key => (
				newItems[key] = this.state.items[key]
			))
			pools.field[poolString].items = newItems
			pools.field[poolString].games = {}

			console.log(pools.field[poolString].items)
			Object.keys(pools.field[poolString].items).forEach((key,index) => {
				console.log("k and I",key,index)
				itemsTemp[key] = items[key]
				Object.keys(pools.field[poolString].items).forEach((key2, index2) => {
					if ((key !== key2) && (index2 >= index)) {
						const innerObj = {}
						innerObj[key] = items[key]
						innerObj[key2] = items[key2]
						poolGames[counter] = innerObj
						counter++
						console.log(index)
					}
				})

			})
			pools.field[poolString].games = poolGames
			console.log("poolgames",poolGames)
			
			//pools.field[`Pool${String.fromCharCode(65+i)}`].items = newItems
			
		}
		console.log(pools)

		this.setState({ pools })
	}

	updateRecord = (winner, loser, diff) => {
		const items = {...this.state.items}
		items[winner].win = (items[winner].win+1) || 1
		items[winner].pointdiff = items[loser].pointdiff + diff
		items[loser].loss = (items[winner].loss+1) || 1
		items[loser].pointdiff = items[loser].pointdiff - diff
		console.log(typeof (items[winner].win),typeof (diff))
		console.log(items)
		//this.setState({ items })
	}

	updateGameScore = (winner, loser, diff, pool, index) => {
		const items = {...this.state.items}
		console.log(items)
		console.log(items[winner].loss)

		items[winner].win = (items[winner].win+1) || 1
		items[winner].pointdiff = items[loser].pointdiff + diff
		items[loser].loss = (items[winner].loss+1) || 1
		items[loser].pointdiff = items[loser].pointdiff - diff
		
		//this.setState({ items })
	}



	render() {
		return (
			
			<Container fluid className="main-app">
			
				<Row>
					<Col xl="3">
						<TourneyList 
							addItem={this.addItem}
							loadItemList={this.loadItemList}
							title="Item List" 
							items={this.state.items} 
							removeItem={this.removeItem}
							addList={this.addList}
							/>
					</Col>
					<Col xl="9">
						<Row>
						<Pools 
							pools={this.state.pools}
							field={this.state.pools.field}
							title="Pools"
							updateNumberPools={this.updateNumberPools}
							createPools={this.createPools}
							updateGameScore={this.updateGameScore}
							/>
						</Row>
						<Row>
						<PoolSchedule 
							field={this.state.pools.field}
							title="Pool Schedule" 
							updateRecord={this.updateRecord}
						/>
						<Bracket title="Bracket" />
						</Row>
					</Col>
					<Col xl="6">

					</Col>
				</Row>
			</Container>
		)	
	}
}

export default App;