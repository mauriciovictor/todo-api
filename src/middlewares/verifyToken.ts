import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../models/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization?.split(" ")[1])
    return res.json({ message: "token not found" });

  const bearerToken = authorization?.split(" ");

  const token = bearerToken![1];

  try {
    const verifyToken = verify(token, process.env.JWT_SECRET!);

    const userModel = getManager().getRepository(User);

    const user = await userModel.findOne({
      where: {
        id: Number(verifyToken.sub),
      },
    });

    if (!user) return res.status(404).json({ message: "user not exits" });

    req.id = user.id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "token invalid!", error });
  }
};
