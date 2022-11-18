import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IPayload {
  uid: string;
  iat: number;
  exp: number;
}
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Token dont exist ",
    });
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.SECRETKEY || "token"
    ) as IPayload;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(payload.uid) },
    });

    if (!user) {
      return res.status(401).json({
        msg: "user dont exits in DB",
      });
    }

    (req as CustomRequest).token = user;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "autorization fail",
    });
  }
};
