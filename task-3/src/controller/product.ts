import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export class Product {
  public async create(req: Request, res: Response) {
    try {
      const { Product_name, description, price, Product_Image } = req.body;

      const data = await prisma.product.create({
        data: {
          Product_name,
          description,
          price,
          Product_Image,
        },
      });
      res.status(201).json({
        data,
      });
    } catch (error) {
      res.status(400).json({
        msg: "Error creating  Category",
      });
    }
  }
  public async findAll(_req: Request, res: Response) {
    try {
      const data = await prisma.product.findMany();
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(400).json({
        msg: "Error  Not found Categories",
      });
    }
  }
  public async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(404).json({
        msg: "Categori not exits ",
      });
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { Product_name, description, price, Product_Image } = req.body;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });

      if (!product) {
        res.status(404).json({
          msg: "Categori not found",
        });
        return;
      }

      const data = await prisma.product.update({
        data: {
          Product_name,
          description,
          price,
          Product_Image,
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
  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      res.status(404).json({
        msg: "Product not found",
      });
      return;
    }
    const data = await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(200).json({
      data,
    });
  }
}
