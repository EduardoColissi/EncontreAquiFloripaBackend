import { Router, Request, Response } from "express";

import UserController from "./controllers/UserController";

const routes = Router();

const user = new UserController();

routes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Olá Encontre Aqui Floripa!" });
});

routes.post("/users/signup", user.create);

export default routes;
