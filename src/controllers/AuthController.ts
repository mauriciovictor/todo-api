import { Request, Response } from "express";
import { getManager } from "typeorm";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { ValidationSchema } from "../helpers/SchemaValidation";
import { User } from "../models/User";
import { SchemaUserAuth } from "../schemas/User/Auth";

class AuthController {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;

    const data = {
      email,
      password,
    };

    const errors = await ValidationSchema(SchemaUserAuth, data);
    if (errors[0]) return res.send({ errors }).status(401);

    const userModel = getManager().getRepository(User);

    let userExist = await userModel.findOne({
      where: {
        email,
      },
    });

    if (!userExist)
      return res.status(401).json({ message: "email or password incorrect!" });

    const passwordMatch = await compare(password, userExist.password);

    if (!passwordMatch)
      return res.status(401).json({ message: "email or password incorrect!" });

    const token = sign({}, process.env.JWT_SECRET!, {
      expiresIn: "30m",
      subject: String(userExist.id),
    });

    res.json({ token });
  }
}

export default new AuthController();
