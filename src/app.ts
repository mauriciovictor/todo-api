import express, { Request, Response, NextFunction } from "express";
import todoController from "./controllers/TodoController";
import checkTodo from "./middlewares/checkTodo";

const app = express();

app.use(express.json());

app.get("/todos", todoController.index);
app.get("/todos/:id", todoController.show);
app.post("/todos", todoController.store);

app.put("/todos/:id", checkTodo, todoController.update);
app.delete("/todos/:id", checkTodo, todoController.destroy);

app.listen(8000);
