import { Router } from "express";

import checkTodo from "../middlewares/checkTodo";

import todoController from "../controllers/TodoController";
import userController from "../controllers/UserController";

const routes = Router();

routes.get("/todos", todoController.index);
routes.get("/todos/:id", checkTodo, todoController.show);
routes.post("/todos", todoController.store);
routes.put("/todos/:id", checkTodo, todoController.update);
routes.delete("/todos/:id", checkTodo, todoController.destroy);

routes.get("/users", userController.index);
routes.post("/users", userController.store);
routes.get("/users/:id", userController.show);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.destroy);

export { routes };
