"use client";

import axios from "axios";
import { ITodo } from "@/types/types";
import { useEffect, useReducer, useState } from "react";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});

enum TODO_ACTION_TYPES {
  ADD = "ADD",
  DELETE = "DELETE",
  UPDATE_TITLE = "UPDATE_TITLE",
  UPDATE_STATUS = "UPDATE_STATUS",
  GET_ALL = "GET_ALL",
}

interface todoActions {
  type: TODO_ACTION_TYPES;
  payload: ITodo[];
}

function reducer(state: ITodo[], action: todoActions): ITodo[] {
  switch (action.type) {
    case TODO_ACTION_TYPES.ADD:
      return action.payload.concat(state);
    case TODO_ACTION_TYPES.DELETE:
      return state.filter((todo) => todo.id !== action.payload[0].id);
    case TODO_ACTION_TYPES.UPDATE_TITLE:
      return state.map((todo) =>
        todo.id === action.payload[0].id
          ? { ...todo, title: action.payload[0].title }
          : todo
      );
    case TODO_ACTION_TYPES.UPDATE_STATUS:
      return state.map((todo) =>
        todo.id === action.payload[0].id
          ? { ...todo, status: action.payload[0].status }
          : todo
      );
    case TODO_ACTION_TYPES.GET_ALL:
      return action.payload;
    default:
      return state;
  }
}

function Profile() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [input, setInput] = useState<string>("");
  const [config, setConfig] = useState({ headers: { Authorization: "" } });
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editInput, setEditInput] = useState<string>("");

  const statusColors = {
    pending: "text-green-500",
    "in-progress": "text-yellow-500",
    complete: "text-red-500",
  };

  const nextStatus = (status: "pending" | "in-progress" | "complete") => {
    switch (status) {
      case "pending":
        return "in-progress";
      case "in-progress":
        return "complete";
      case "complete":
        return "pending";
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("jwt-token");
    if (token) {
      setConfig({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, []);

  function handleAddTodo() {
    instance
      .post(
        "/todos",
        { title: input, status: "pending", createdAt: new Date() },
        config
      )
      .then((r) => {
        dispatch({
          type: TODO_ACTION_TYPES.ADD,
          payload: [
            {
              id: r.data.id,
              title: r.data.title,
              createdAt: r.data.createdAt,
              status: "pending",
            },
          ],
        });
        setInput("");
      })
      .catch((err) => {
        const response = JSON.parse(err.request.response);
        alert(response.message);
      });
  }

  function handleDeleteTodo(todo: ITodo) {
    instance
      .delete(`/todos/${todo.id}`, config)
      .then(() =>
        dispatch({
          type: TODO_ACTION_TYPES.DELETE,
          payload: [todo],
        })
      )
      .catch((err) => {
        const response = JSON.parse(err.request.response);
        alert(response.message);
      });
  }

  function handleUpdateTitle(todo: ITodo) {
    instance
      .patch(`/todos/${todo.id}`, { title: editInput }, config)
      .then(() => {
        dispatch({
          type: TODO_ACTION_TYPES.UPDATE_TITLE,
          payload: [{ ...todo, title: editInput }],
        });
        setEditMode(null);
        setEditInput("");
      })
      .catch((err) => {
        const response = JSON.parse(err.request.response);
        alert(response.message);
      });
  }

  function handleUpdateStatus(todo: ITodo) {
    const updatedStatus = nextStatus(todo.status);
    instance
      .patch(`/todos/${todo.id}`, { status: updatedStatus }, config)
      .then(() => {
        dispatch({
          type: TODO_ACTION_TYPES.UPDATE_STATUS,
          payload: [{ ...todo, status: updatedStatus }],
        });
      })
      .catch((err) => {
        const response = JSON.parse(err.request.response);
        alert(response.message);
      });
  }

  useEffect(() => {
    if (config.headers.Authorization) {
      instance
        .get("/todos", config)
        .then((r) => {
          setIsLoaded(true);
          dispatch({ type: TODO_ACTION_TYPES.GET_ALL, payload: r.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [config]);

  return (
    <div className="ml-auto mr-auto mt-20 flex min-h-64 w-1/2 flex-col rounded-xl border-4 shadow-xl">
      <div className="mt-10 flex justify-center gap-10">
        <input
          type="text"
          className="border-b-2 focus:border-gray-500 focus:outline-none"
          placeholder="type a todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="text-2xl transition-colors duration-500 hover:text-gray-300"
          onClick={handleAddTodo}
        >
          +
        </button>
      </div>
      {isLoaded ? (
        <ul className="mx-4 mb-4 mt-8 flex flex-col gap-3">
          {todos.map((todo) => (
            <div
              className="flex min-h-10 flex-row items-center rounded-xl bg-gray-200 px-4 py-2"
              key={todo.id}
            >
              {editMode === todo.id ? (
                <>
                  <input
                    type="text"
                    className="flex-grow border-b-2 focus:border-gray-500 focus:outline-none"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdateTitle(todo)}
                    className="ml-2 text-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(null);
                      setEditInput("");
                    }}
                    className="ml-2 text-red-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <li className="flex-grow text-2xl">{todo.title}</li>
                  <button
                    className="mr-2 text-blue-500"
                    onClick={() => {
                      setEditMode(todo.id);
                      setEditInput(todo.title);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(todo)}
                    className={`${statusColors[todo.status]} ml-2`}
                  >
                    {todo.status}
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo)}
                    className="ml-2"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                  </button>
                </>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <span className="m-auto">Loading...</span>
      )}
    </div>
  );
}

export default Profile;
