import { Router } from "express";

import checkTodo from "../middlewares/checkTodo";

import todoController from "../controllers/TodoController";
import userController from "../controllers/UserController";
import authController from "../controllers/AuthController";
import verifyToken from "../middlewares/verifyToken";
import refreshTokenController from "../controllers/RefreshTokenController";

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
