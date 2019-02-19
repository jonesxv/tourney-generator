import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Item from "./Item"

const SortableItem = SortableElement(({value}) =>
  <Item name={value} />
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {Object.keys(items).map((value, index) => (
        <p>{items[index]}</p>
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: [

      {
        id: 323134,
        name: 'Item 1'
      },
      {
        id: 23927,
        name: 'Item 2'
      }
    
          ],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableComponent