import { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";

import TodoItems from "./TodoItems";

const Todo = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [todoList, settodoList] = useState(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      // Handle the error, e.g. log it or show an error message
      console.error(error);
      return [];
    }
  });

  const add = () => {
    const inputText = (inputRef.current?.value ?? "").trim();
    if (inputText) {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
      };

      settodoList((prev: any) => [...prev, newTodo]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      console.log(inputText);
    }
  };

  const deleteTodo = (id: any) => {
    settodoList((prevTodos: any) => {
      return prevTodos.filter((todo: any) => todo.id !== id);
    });
  };

  const toggleItem = (id: any) => {
    settodoList((prevTodos: any) => {
      return prevTodos.map((todo: any) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* title */}

      <div className="flex items-center mt-7 gap-2 ">
        <img className="w-8" src={todo_icon} alt="/" />
        <h1 className="text-3xl font-semibold ">TO-DO List</h1>
      </div>

      {/* Input box */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          type="text"
          ref={inputRef}
          placeholder="Add your task"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 "
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* Todo list  */}

      <div>
        {todoList.map((item: any, index: any) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggleItem}
            />
          );
        })}
        {/* <TodoItems text={"Learn coding"} /> */}
      </div>
    </div>
  );
};

export default Todo;
