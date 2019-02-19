import React from 'react'
import { Button } from 'reactstrap'
// import Item from './Item'
import { _ } from 'lodash'



class Pool extends React.Component {

	render() {


		return (
			<table className="pool">
				<thead>
					
					<tr>
						<th>{this.props.title}</th>
						<th className="point-diff" />
						<th className="point-diff" />
					</tr>
					<tr>
						<th>Name</th>
						<th className="point-diff">Record</th>
						<th className="point-diff">Point Diff</th>
					</tr>
				</thead>
				<tbody>
					{Object.values(this.props.name).map(e => (
						<tr key={e}>
							<td>{this.props.field[this.props.title].items[e].name}</td>
							<td>3-0</td>
							<td>+23</td>
						</tr>
					))}
				</tbody>
			</table>

		)
	}
}


class Pools extends React.Component {
	updatePoolNum = e => {
		e.preventDefault()
		this.props.updateNumberPools(this.inputPoolNumber.value)
	}

	
	render() {
		const poolComponents = Object.keys(this.props.field).map(key => (
			<Pool
				key={key}
				title={key}
				name={Object.keys(this.props.field[key].items)}
				field={this.props.field}
				updateGameScore={this.props.updateGameScore}
			/>
		))

		return (
			<div>
				<h2>Pools</h2>
				<form className="pool-num-form" onSubmit={this.updatePoolNum}>
					Enter Number of Pools

					<input 
						type="text"
						ref={a => this.inputPoolNumber = a}
					/>
					<Button onClick={() => this.props.createPools(this.inputPoolNumber.value)}>Create Pools</Button>
				</form>
				{poolComponents}
			</div>
		)
	}
}

export default Pools