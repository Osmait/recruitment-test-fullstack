import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

import bcrypt from "bcryptjs";
import generarJWT from "../helpers/jwt";

const prisma = new PrismaClient();

export class Login {
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({ where: { email: email } });

      if (!user) {
        res.status(404).json({
          msg: "user not found",
        });
        return;
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (user.email !== email || !validPassword) {
        res.status(404).json({
          msg: "Email or password was not correct",
        });
        return;
      }
      const token = await generarJWT(user.id.toString());
      user.password = "";

      res.status(201).json({
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        msg: "Error creating user",
      });
    }
  }
}
