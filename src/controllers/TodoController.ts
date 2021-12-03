import { Request, Response } from "express";
import { getManager, Like } from "typeorm";

import { Todos } from "../models";
import { Todo } from "../utils/interfaces/Todo";

interface Pagination {
  skip: number;
  take: number;
}

interface Condicions {
  [key: string]: string;
}

class TodoController {
  async index(req: Request, res: Response) {
    const todos = getManager().getRepository(Todos);

    const { page, limit, id, complete, name } = req.query;

    const condicions = {
      where: {
        complete,
        name: name ? Like(`%${name}%`) : "",
        id,
      } as Condicions,
    };

    for (var condicion in condicions.where) {
      if (!condicions.where[`${condicion}`])
        delete condicions.where[`${condicion}`];
    }

    const total_todos = await todos.count({
      where: {
        ...condicions.where,
        user_id: req.id,
      },
    });

    const pagination = {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    } as Pagination;

    const data = await todos.find({
      ...pagination,
      where: {
        ...condicions.where,
        user_id: req.id,
      },
    });

    const response = {
      todos: data,
      pagination: {
        pages: Math.ceil(total_todos / Number(limit)),
        limit: Number(limit),
        current_page: Number(page),
      },
    };

    res.json(response).status(200);
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
    const todo = await todos.save({ name, complete, user_id: req.id });
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
