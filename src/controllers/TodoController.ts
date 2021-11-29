import { Request, Response } from "express";
import { Todo } from "../utils/interfaces/Todo";
import { getManager } from "typeorm";

import { Todos } from "../models/Todo";

class TodoController {
  async index(_: Request, res: Response) {
    const todos = getManager().getRepository(Todos);
    const data = await todos.find();

    res.json(data).status(200);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const todos = getManager().getRepository(Todos);

    const todo = await todos.findOne({
      where: {
        id,
      },
    });

    res.json(todo).status(200);
  }

  async store(req: Request, res: Response) {
    const { complete, name } = req.body as Todo;
    const todos = getManager().getRepository(Todos);
    const todo = await todos.save({ name, complete });

    res.json(todo).status(201);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, complete } = req.body as Todo;

    const todos = getManager().getRepository(Todos);

    await todos.update({ id: Number(id) }, { name, complete });

    const todo = await todos.findOne(id);

    res.json(todo).status(200);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const todos = getManager().getRepository(Todos);

    await todos.delete({
      id: Number(id),
    });

    res.json({ message: "Deletado com sucesso" }).status(200);
  }
}

export default new TodoController();
