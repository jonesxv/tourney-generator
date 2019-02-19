import React from 'react'
import Item from './Item'
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { _ } from 'lodash'


class TourneyList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [''],
			file: null
		}

		this.addItem = this.addItem.bind(this)
	}

	addItem(event) {
		event.preventDefault()
		console.log(this.inputItem.value)
		const newItem = {
			name: this.inputItem.value,
			win: 0,
			loss: 0,
			pointdiff: 0
		}
		console.log(newItem)
		this.props.addItem(newItem)
		event.currentTarget.reset()
	}


	handleFileChosen = file => {
		console.log(file.target.files[0])
		let fileReader = new FileReader()
		fileReader.onload = event => {
			const content = fileReader.result
			console.log(content)
			this.props.addList(content)
		}
		fileReader.readAsText(file.target.files[0])
    }


	render() {
		const totalItems = Object.keys(this.props.items).length

		return (			
			<ListGroup className="participant-list">
				<h2>{this.props.title}</h2>
				<h4>Total: {totalItems}</h4>
				<p>Click item to delete</p>
				{Object.keys(this.props.items).map(key => (
              		<Item
              			key={key}
              			index={key}
              			name={this.props.items[key].name}
      					removeItem={this.props.removeItem}
              			/>
              		))}
				<ListGroupItem>
					<form onSubmit={this.addItem}>
						<input 
							ref={a => this.inputItem = a}
							type="text"
							required 
							placeholder="add Item" />
					</form>
				</ListGroupItem>

				<Button onClick={this.props.loadItemList}>Load Sample List</Button>
				<input 
					type="file"
					id="file"
					accept=".txt"
					onChange={this.handleFileChosen}
				/>
			</ListGroup>

		)	
	}
}


export default TourneyList