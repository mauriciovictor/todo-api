import { Todo } from "../utils/interfaces/Todo";

let Todos = [] as Todo[];

function setTodoData(values: Todo[]) {
  Todos = [...values];
}

export { Todos, setTodoData };
