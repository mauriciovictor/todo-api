import { Request, Response } from "express";
import { getManager } from "typeorm";
import { hash } from "bcrypt";

import { SchemaUserCreate } from "../schemas/User/Create";
import { SchemaUserUpdate } from "../schemas/User/Update";

import { ValidationSchema } from "../helpers/SchemaValidation";
import { User } from "../models/User";

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface UserDataUpdate {
  [key: string]: string;
}

class UserController {
  async index(req: Request, res: Response) {
    const userModel = getManager().getRepository(User);

    const users = await userModel.find();

    res.send(users);
  }

  async show(req: Request, res: Response) {
    const userModel = getManager().getRepository(User);
    const user = await userModel.findOne({
      where: {
        id: req.id,
      },
    });

    res.send(user).status(200);
  }

  async update(req: Request, res: Response) {
    const { name, email, password } = req.body as UserData;

    let passwordHash = "";
    if (password) passwordHash = await hash(password, 8);

    const data = {
      name,
      email,
      password,
    } as UserDataUpdate;

    const errors = await ValidationSchema(SchemaUserUpdate, data);
    if (errors[0]) return res.json({ errors });

    const userModel = getManager().getRepository(User);

    try {
      for (let field in data) {
        if (!data[field]) delete data[field];
      }

      const id = req.id;

      await userModel.update({ id }, data);

      const user = await userModel.findOne({
        where: {
          id,
        },
      });

      res.send(user).status(200);
    } catch (error) {
      res.send({ message: "Não foi possivel alterar o usuário!" }).status(200);
    }
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body as UserData;

    const data = {
      name,
      email,
      password,
    };

    const errors = await ValidationSchema(SchemaUserCreate, data);
    if (errors[0]) return res.json({ errors });

    const userModel = getManager().getRepository(User);

    const passwordHash = await hash(password, 8);

    try {
      const findUser = await userModel.findOne({
        where: {
          email,
        },
      });

      if (findUser)
        return res.send({ message: "Usuário já existe" }).status(401);

      const user = await userModel.save({
        name,
        email,
        password: passwordHash,
      });

      return res.send(user);
    } catch (error) {
      return res.send({ message: "Não foi possivel salvar o usuário!" });
    }
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const userModel = getManager().getRepository(User);

      await userModel.delete({
        id: Number(id),
      });

      return res.send({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      return res.send({ message: "Não foi possivel deletar!" });
    }
  }
}

export default new UserController();
