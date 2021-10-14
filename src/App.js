import React, { Component } from "react";
import "./App.css";
import { initialState } from "./data";
import { getFromStorage, setToStorage, dranEndCB } from "./utils";
import AppHeader from "./components/app-header";
import AppBody from "./components/app-body";

export class App extends Component {
  state = getFromStorage("todos") || initialState;

  updateStorage = () => setToStorage("todos", this.state);

  action = (actionType, todoItem) => {
    switch (actionType) {
      case "edit": {
        this.saveHandler(todoItem);
        break;
      }
      case "delete": {
        this.deleteItem(todoItem);
        break;
      }
      default:
        break;
    }
  };

  deleteItem = ({type, id}) => {
    const newDatas = this.state[type].filter((item) => item.id !== id);
    this.setState(
      (state) => ({ ...state, [type]: newDatas }),
      this.updateStorage
    );
  };

  onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    this.setState(
      (state) => dranEndCB(state, source, destination),
      this.updateStorage
    );
  };

  saveHandler = (todoItem) => {
    const { type, id } = todoItem;
    const itemIndex = this.state[type].findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      this.state[type].push(todoItem);
    } else {
      this.state[type].splice(itemIndex, 1, todoItem);
    }
    const newDatas = this.state[type];
    this.setState(
      (state) => ({ ...state, [type]: newDatas }),
      this.updateStorage
    );
  };

  render() {
    return (
      <div id="app">
        <AppHeader></AppHeader>
        <AppBody
          onDragEndCb={this.onDragEnd}
          action={this.action}
          {...this.state}
        ></AppBody>
      </div>
    );
  }
}

export default App;
