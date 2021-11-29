import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import { Todos } from "../models/Todo";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const todos = getManager().getRepository(Todos);

  const todo = await todos.findOne(id);

  if (!todo) return res.json({ message: "Todo not exist" });

  next();
};
