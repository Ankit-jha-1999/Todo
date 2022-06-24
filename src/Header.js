import React, { useState } from "react";
import TodoList from "./TodoList";
import "./Header.css";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(null);

  const AddTask = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  };

  const showTask = () => {
    if (!task) {
      alert("Add the Task");
    } else if (task && !toggle) {
      // setTaskList(
      //   taskList.map((elem) => {
      //     if (elem.id === edit) {
      //       return { ...elem, title: task };
      //     }
      //     return elem;
      //   })
      // );
      for (let t of taskList) {
        if (t.id === edit) {
          t.title = task;
          break;
        }
      }
      setTaskList(taskList);
      setToggle(true);
      setTask("");
      setEdit(null);
    } else {
      const todos = [
        { id: uuidv4(), title: task, isCompleted: false, isEditable: true },
        ...taskList,
      ];
      setTaskList(todos);
    }
    setTask("");
  };

  const deleteItems = (e, id) => {
    e.stopPropagation();
    setTaskList(taskList.filter((e) => e.id !== id));
  };


  const editItem = (e, id) => {
    e.stopPropagation();
    const newItem = taskList.find((elem) => {
      return elem.id === id;
    });
    if (newItem.isEditable) {
      setToggle(false);
      setTask(newItem.title);
      setEdit(id);
      console.log("hiiiiii");
    } else  {
      setToggle(true);
      setTask();
      setEdit();
      console.log("bye");
    }
  };

  const Completed = (id) => {
    let i = taskList.findIndex((e) => e.id === id);
    setTaskList([
      ...taskList.slice(0, i),
      { ...taskList[i], isCompleted: true },
      ...taskList.slice(i + 1),
    ]);
  };

  const editable = (event, id) => {
    event.stopPropagation();
    let i = taskList.findIndex((e) => e.id === id);
    setTaskList([
      ...taskList.slice(0, i),
      { ...taskList[i], isEditable: false },
      ...taskList.slice(i + 1),
    ]);
  };

  const enterData = (event) => {
    if(event.key === "Enter"){
      showTask();
    }
  }

  return (
    <>
      <section className="todo-app">
        <header className="todo-header">
          <div className="header-container">
            <div className="main-heading">
              <h1>What's the Plan for Today</h1>
            </div>
            <div className="input-feild">
              <input
                type="text"
                placeholder="Add today task..."
                onChange={AddTask}
                value={task}
                className="text"
                onKeyUp={enterData}
              ></input>
              {toggle ? (
                <button type="button" onClick={showTask} className="btn">
                  Add Task
                </button>
              ) : (
                <button type="button" onClick={showTask} className="btn">
                  Edit Task
                </button>
              )}
            </div>
          </div>
        </header>
        <div>
          <ol className="ol">
            {taskList.map((item) => {
              return (
                <TodoList
                  item={item}
                  key={item.id}
                  onDelete={deleteItems}
                  onEdit={editItem}
                  handleCompleted={Completed}
                  handleEditable={editable}
                />
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
};
export default Header;
