import { Router } from "express";
import todoController from "../controllers/TodoController";
import checkTodo from "../middlewares/checkTodo";

const routes = Router();

routes.get("/todos", todoController.index);
routes.get("/todos/:id", checkTodo, todoController.show);
routes.post("/todos", todoController.store);

routes.put("/todos/:id", checkTodo, todoController.update);
routes.delete("/todos/:id", checkTodo, todoController.destroy);

export { routes };
