import { Router } from "express";

import { checkTodo, verifyToken } from "../middlewares";

import {
  authController,
  refreshTokenController,
  todoController,
  userController,
} from "../controllers";

const routes = Router();

routes.post("/authenticate", authController.auth);
routes.post("/refresh-token", verifyToken, refreshTokenController.store);

routes.get("/todos", verifyToken, todoController.index);
routes.get("/todos/:id", verifyToken, checkTodo, todoController.show);
routes.post("/todos", verifyToken, todoController.store);
routes.put("/todos/:id", verifyToken, checkTodo, todoController.update);
routes.delete("/todos/:id", verifyToken, checkTodo, todoController.destroy);

routes.get("/users", verifyToken, userController.index);
routes.get("/user", verifyToken, userController.show);
routes.post("/users", userController.store);
routes.put("/users", verifyToken, userController.update);
routes.delete("/users/:id", verifyToken, userController.destroy);

export { routes };
