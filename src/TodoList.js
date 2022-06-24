import React from "react";
import "./TodoList.css";

const TodoList = ({ item, onDelete, onEdit, handleCompleted, handleEditable }) => {
  const { id, title, isCompleted, isEditable } = item;
  return (
    <div className="task-list" onClick={() => handleCompleted(id)}>
      <li
        className="list"
        style={{
          textDecoration: isCompleted && "line-through",
          textDecorationColor: isCompleted && "black",
          color: isCompleted && "red"
        }}
      >
        {title}
      </li>
      <div className="edit" >
        <i
          className="fa fa-circle-check circle"
          onClick={(e)=>handleEditable(e,id)}
          style={{
            color: isEditable ? "skyblue" : "red"
          }}
        />
        <i className="fa-solid fa-pen-to-square" onClick={(e) => onEdit(e,id)}></i>
        <i
          className="fa-regular fa-trash-can del-btn"
          onClick={(e) => onDelete(e,id)}
        ></i>
      </div>
    </div>
  );
};

export default TodoList;
