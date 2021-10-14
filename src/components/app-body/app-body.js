import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TodoList from "../todo-list";
import Modal from "../modal";

export class AppBody extends Component {
  state = { isEditing: false };
  toggleModal = () => {
    this.setState((state) => ({ isEditing: !state.isEditing }));
  };
  render() {
    const { isEditing } = this.state;
    const { onDragEndCb, saveHandler, action, ...data } = this.props;
    const lists = Object.keys(data)
      .reverse()
      .map((key) => ({ data: data[key], title: key }));

    const { toggleModal } = this;
    return (
      <main className="bg-primary flex-grow-1 py-3 d-flex">
        <DragDropContext onDragEnd={onDragEndCb}>
          <div className="container d-flex flex-column">
            <div className="row flex-grow-1">
              {lists.map((list) => (
                <div className="col-4 d-flex" key={list.title}>
                  <TodoList
                    data={list.data}
                    title={list.title}
                    id={list.title}
                    action={action}
                  >
                    {list.title === "to do" ? (
                      <button
                        type="button"
                        className="btn btn-primary py-0 px-2"
                        onClick={() => toggleModal()}
                      >
                        Add
                      </button>
                    ) : (
                      ""
                    )}
                  </TodoList>
                </div>
              ))}
            </div>
          </div>
        </DragDropContext>
        {isEditing ? (
          <Modal
            toggleModal={this.toggleModal}
            item={{title:"",text:""}}
            action={action}
            edit={false}
          ></Modal>
        ) : (
          ""
        )}
      </main>
    );
  }
}

export default AppBody;
