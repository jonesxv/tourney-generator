import React from 'react'
import { ListGroupItem } from 'reactstrap';

class Item extends React.Component {
	handleRemove = (event) => {
		this.props.removeItem(this.props.index)
	}
	render() {
		return (
				<ListGroupItem 
				index={this.props.index}
				onClick={this.handleRemove}>
					{this.props.name}
				</ListGroupItem>
		)
	}
}

export default Item