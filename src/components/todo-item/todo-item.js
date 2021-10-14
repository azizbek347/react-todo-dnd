import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./todo-item.css";
import Modal from "../modal";

export class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }
  toggleModal = () => {
    this.setState((state) => ({ isEditing: !state.isEditing }));
  };
  render() {
    const { index, item, action } = this.props;
    const { isEditing } = this.state;
    return (
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              className="todo-item container mb-2"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="row py-3">
                <header className="col-12">
                  <div className="d-flex justify-content-between px-2">
                    <span className="text-dark">{item.title}</span>
                    <div className="actions">
                      <div className="actions__label border"></div>
                      <div className="actions__btns">
                        <button
                          className="actions__btn text-muted"
                          onClick={() => this.toggleModal()}
                        >
                          <span className="edit-icon"></span>
                          <span className="text"> Edit</span>
                        </button>
                        <button
                          className="actions__btn text-danger"
                          onClick={() => action("delete", item)}
                        >
                          <span className="delete-icon"></span>
                          <span className="text"> Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="my-3 border-bottom"></div>
                </header>
                <div className="col-12">
                  <div className="px-2">{item.text}</div>
                </div>
              </div>
              {isEditing ? (
                <Modal
                  toggleModal={this.toggleModal}
                  item={item}
                  action={action}
                  edit={true}
                ></Modal>
              ) : (
                ""
              )}
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default TodoItem;
