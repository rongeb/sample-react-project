import React, { Component } from "react";
import TableBody from "./tableBody";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Eléments</th>
        <th>Présents ?</th>
      </tr>
    </thead>
  );
};

// let itemChoosen = [];

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cssForm: props.className
    };
    // console.log('Table', props);
  }

  deleteCheckboxState = (name, checked) => {
    const updateChecked = typeof checked === "undefined" ? true : false;
    this.setState(prevState => prevState.checkedItems.set(name, updateChecked));
  };

  clearAllCheckboxes = () => {
    const clearCheckedItems = new Map();
    this.setState({ checkedItems: clearCheckedItems });
  };

  handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked });

  getFormClass() {
    return this.props.className;
  }

  render() {
    const { potentialAnswers } = this.props;
    const { checkedItems } = this.props;
    const cssForm = this.getFormClass();
    //console.log("render ", this.props);

    return (
      <table className={cssForm}>
        <TableHeader />
        <TableBody
          potentialAnswers={potentialAnswers}
          checkedItems={checkedItems}
        />
      </table>
    );
  }
}

export default Table;
