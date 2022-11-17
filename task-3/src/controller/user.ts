import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { encryptPassword } from "../helpers/encryptPassword";
import { CustomRequest } from "../middleware/validationJWT";

const prisma = new PrismaClient();

interface tokenInterface {
  id: number;
  password: string;
}

export class User {
  public async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await prisma.user.create({
        data: {
          email,
          password: encryptPassword(password),
        },
      });

      res.status(201).json({
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        msg: "Error creating user",
      });
    }
  }
  public async findAll(_req: Request, res: Response) {
    try {
      const data = await prisma.user.findMany();
      res.status(202).json({
        data,
      });
    } catch (error) {
      res.status(400).json({
        msg: "not found users",
      });
    }
  }
  public async finOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(404).json({
        msg: "User not exits ",
      });
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        res.status(404).json({
          msg: "User not found",
        });
        return;
      }

      const data = await prisma.user.update({
        data: {
          email,
          password: encryptPassword(password),
        },
        where: { id: parseInt(id) },
      });
      res.status(200).json({
        msg: "Update success",
        data,
      });
    } catch (error) {
      res.status(404).json({
        msg: "Update Failes",
      });
    }
  }
  public async detele(req: Request, res: Response) {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      res.status(404).json({
        msg: "User not found",
      });
      return;
    }
    const data = await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(200).json({
      data,
    });
  }
  perfil = async (req: Request, res: Response) => {
    const user = (req as CustomRequest).token as tokenInterface;
    user.password = "";
    res.json(user);
  };
}
