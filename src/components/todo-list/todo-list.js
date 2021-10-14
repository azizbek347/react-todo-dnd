import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import "./todo-list.css";
import TodoItem from "../todo-item";

const TodoList = ({ title, data, id, children, action }) => {
  return (
    <div className="w-100 d-flex flex-column">
      <header className="bg-white">
        <div className="container">
          <div className="row">
            <div className="col py-3 m-0 d-flex justify-content-between align-items-center todo-list__header">
              <span className="text-dark">
                {title.split(" ").map(letter => letter[0].toUpperCase() + letter.slice(1)).join(" ")} ({data.length})
              </span>
              {children}
            </div>
          </div>
        </div>
      </header>
      <Droppable droppableId={id}>
        {(provided,snapshot) => {
          return (
            <ul className={`listgroup p-2 flex-grow-1 todo-list ${snapshot.isDraggingOver ? "todo-list_dragged-over" : ""}`}
             {...provided.droppableProps}
             ref={provided.innerRef}>
              {data.map((item, index) => <TodoItem key={item.id} index={index} item={item} action={action}></TodoItem>)}
              {provided.placeholder}
            </ul>
          )
        }}
      </Droppable>
    </div>
  )
}

export default TodoList
