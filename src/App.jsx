import React, { useState } from "react";
import "./styles.css";

import { InputTodo } from "./components/InputTodo";
import { IncompletedTodo } from "./components/IncompletedTodo";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompletedTodos, setIncompletedTodos] = useState(["aaa", "sss"]);
  const [completeTodos, setCompleteTodos] = useState(["fff"]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickDelete = (index) => {
    const newTodo = [...incompletedTodos];
    newTodo.splice(index, 1);
    setIncompletedTodos(newTodo);
  };

  const onClickComplete = (index) => {
    const inCompletedTodos = [...incompletedTodos];
    inCompletedTodos.splice(index, 1);

    const newCompletedTodos = [...completeTodos, incompletedTodos[index]];
    setCompleteTodos(newCompletedTodos);
    setIncompletedTodos(inCompletedTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompletedTodos = [...incompletedTodos, completeTodos[index]];
    setIncompletedTodos(newIncompletedTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompletedTodos, todoText];
    setIncompletedTodos(newTodos);
    setTodoText("");
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompletedTodos.length >= 5}
      />
      {incompletedTodos.length >= 5 && (
        <p style={{ color: "#C00" }}>登録できるのは５個までです</p>
      )}
      <IncompletedTodo
        todos={incompletedTodos}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
