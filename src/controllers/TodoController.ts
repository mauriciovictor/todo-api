import { Request, Response } from "express";
import { Todo } from "../utils/interfaces/Todo";
import { Todos, setTodoData } from "../database/Todo";

class TodoController {
  index(_: Request, res: Response) {
    res.json(Todos).status(200);
  }

  show(req: Request, res: Response) {
    const { id } = req.params;
    const todo = Todos.filter((td) => td.id === id);
    res.json(todo).status(200);
  }

  store(req: Request, res: Response) {
    const { id, isComplete, nome } = req.body as Todo;

    const data = {
      id,
      nome,
      isComplete,
    };

    Todos.push(data);

    res.json(data).status(201);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, isComplete } = req.body as Todo;
    const newTodo = [...Todos];

    const findIndexTodo = Todos.findIndex((todo) => id === todo.id);

    console.log(id);

    newTodo[findIndexTodo].nome = nome;
    newTodo[findIndexTodo].isComplete = isComplete;

    setTodoData(newTodo);

    res.json(Todos[findIndexTodo]).status(200);
  }

  destroy(req: Request, res: Response) {
    const { id } = req.params;

    let newTodo = Todos.filter((todo) => todo.id !== id);

    setTodoData(newTodo);
    res.json({ message: "Deletado com sucesso" }).status(200);
  }
}

export default new TodoController();
