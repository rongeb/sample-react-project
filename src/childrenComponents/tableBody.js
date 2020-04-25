import React, { Component } from "react";
import Checkbox from "./checkbox";

class TableBody extends Component {
  constructor(props) {
    super(props);
    // console.log('constructor', props);
    this.state = {
      checkedItems: props.checkedItems,
      items: []
    };

    this.state.checkedItems = props.potentialAnswers.map((item, index) => {
      return { name: item + index, value: item, checked: false };
    });
    this.handleChange = this.handleChange.bind(this);
  }

  trElements = [];

  handleTrClick = (itemName, itemChecked, index) => {
    console.log(this.trElements);
    console.log("handleTrClick", itemName + "  " + itemChecked + "  " + index);
    this.updateCheckedItems(itemName, itemChecked);
  };

  tableBody = () => {
    // console.log('props', props);
    // console.log("tableBody potentialAnswers", props);
    const { checkedItems } = this.state;

    const rows = checkedItems.map(item => {
      // console.log("TableBody row", item);
      return (
        <React.Fragment key={item.name}>
          <tr>
            <td>
              {
                <Checkbox
                  name={item.name}
                  checked={item.checked}
                  onChange={this.handleChange}
                />
              }
            </td>
            <td>{item.value}</td>
          </tr>
        </React.Fragment>
      );
    });
    return <tbody>{rows}</tbody>;
  };

  componentDidUpdate(prevProps) {
    if (this.props.potentialAnswers !== prevProps.potentialAnswers) {
      const checkedItems = this.props.potentialAnswers.map((item, index) => {
        return { name: item + index, value: item, checked: false };
      });
      this.setState({ checkedItems });
    }
  }

  handleChange = e => {
    // console.log('handleChange e', e);
    const itemName = e.target.name;
    const isChecked = e.target.checked;
    // console.log('handleChange item', e);
    // console.log('handleChange isChecked', isChecked);
    this.updateCheckedItems(itemName, isChecked, e);
  };

  updateCheckedItems(itemName, isChecked) {
    // console.log('handleChange item', itemName);
    // console.log('handleChange isChecked', isChecked);
    this.setState(prevCheckedItems => {
      // console.log('itemName', itemName);
      let newItems = [...prevCheckedItems.checkedItems];
      const newItemsLength = newItems.length;
      for (let i = 0; i < newItemsLength; i++) {
        // console.log('newItems[i]', newItems[i]);
        if (newItems[i].name === itemName) {
          // console.log('prevCheckedItems.checkedItems[index]', newItems.checkedItems[i].name);
          newItems[i].checked = isChecked;
        }
      }
      this.sendItems(newItems);
      // console.log('updateCheckedItems', newItems);
      // console.log(e);
      return { checkedItems: newItems };
    });
  }

  sendItems = items => {
    this.props.checkedItems(items);
  };

  deleteCheckboxState = (name, checked) => {
    const updateChecked = typeof checked === "undefined" ? true : false;
    this.setState((prevState, props) =>
      prevState.checkedItems.set(name, updateChecked)
    );
  };

  clearAllCheckboxes = () => {
    const clearCheckedItems = new Map();
    this.setState({ checkedItems: clearCheckedItems });
  };

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked });
  };

  render() {
    return this.tableBody();
  }
}

export default TableBody;
