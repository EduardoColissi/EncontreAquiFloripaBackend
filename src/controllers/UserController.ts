import { Response, Request } from "express";
import prismaClient from "../../src/database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import bcryptjs, { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

type UserInterface = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  senha: string;
};

export default class UserController {
  async create(req: Request, res: Response){
    try {
        const { nome, cpf, email, celular, senha } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let userExists = await prismaClient.user.findUnique({ where: { email } });

        if (userExists){
            return res.status(422).json({ message: "Usuário já cadastrado" });
        }

        const hashPassword = await hash(senha, 8);

        const newUser = await prismaClient.user.create({
            data: <UserInterface>{
                nome,
                cpf,
                email,
                celular,
                senha: hashPassword
            },
        });
    }
  }
}
