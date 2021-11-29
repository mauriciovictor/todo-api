import { Request, Response, NextFunction } from "express";
import { Todos, setTodoData } from "../database/Todo";

export default (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const findTodo = Todos.filter((td) => td.id === id);

  console.log(findTodo);

  if (!findTodo[0]) return res.json({ message: "Todo not exist" });

  next();
};
