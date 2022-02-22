import React, { useEffect, useRef, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { v4 } from "uuid";
function TodoInp(props) {
  let prevTodos = window.localStorage.getItem("todos");
  if (!prevTodos) {
    prevTodos = [];
  } else {
    prevTodos = JSON.parse(prevTodos);
  }

  const [todos, setTodos] = useState(prevTodos);
  const [visibilty, setVisibilty] = useState("all");

  const inputRef = useRef();

  const onSubmitCallBack = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    inputRef.current.value = "";

    setTodos([
      ...todos,
      {
        id: v4(),
        title: inputValue,
        completed: false,
      },
    ]);
  };

  const setCompleted = (itemId, checked) => {
    const copyTodos = [...todos];
    for (let todo of copyTodos) {
      if (todo.id === itemId) {
        todo.completed = checked;
        break;
      }
    }
    setTodos(copyTodos);
  };

  const deleteItem = (itemId) => {
    const copyTodos = [...todos];
    for (let i in copyTodos) {
      if (copyTodos[i].id === itemId) {
        copyTodos.splice(i, 1);
        break;
      }
    }
    setTodos(copyTodos);
  };

  const clearCompletedCallBack = () => {
    const copyTodos = todos.filter((todo) => !todo.completed);

    setTodos(copyTodos);
  };

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  return (
    <React.Fragment>
      <div className="container text-center">
        <h1>TODOS</h1>
        <div className="form-group">
          <form onSubmit={onSubmitCallBack}>
            <input
              type="text"
              placeholder="What needs to be done?"
              className="form-control"
              ref={inputRef}
            />
          </form>
        </div>
        <div>
          {todos
            .filter((todo) => {
              if (visibilty === "all") {
                return true;
              } else if (visibilty === "active" && !todo.completed) {
                return true;
              } else if (visibilty === "completed" && todo.completed) {
                return true;
              } else {
                return false;
              }
            })
            .map((todo) => (
              <TodoItem
                key={`item- ${todo.id}`}
                item={todo}
                changeCompleted={setCompleted}
                deleteItem={deleteItem}
              />
            ))}
        </div>
        <div className="row">
          <div className="col-3">
            <button
              onClick={() => setVisibilty("all")}
              className="btn btn-primary"
            >
              All
            </button>
          </div>
          <div className="col-3">
            <button
              onClick={() => setVisibilty("active")}
              className="btn btn-warning"
            >
              Active
            </button>
          </div>
          <div className="col-3">
            <button
              onClick={() => setVisibilty("completed")}
              className="btn btn-success"
            >
              Completed
            </button>
          </div>
          <div className="col-3">
            <button className="btn btn-danger" onClick={clearCompletedCallBack}>
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TodoInp;
