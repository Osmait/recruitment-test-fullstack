import { Router } from "express";
import { Product } from "../../controller/product";
import { validateInfoProducto } from "../../middleware/validationUsers";

const router = Router();
const product = new Product();

router.post("/product", validateInfoProducto, product.create);
router.get("/product", product.findAll);
router.get("/product/:id", product.findOne);
router.put("/product/:id", validateInfoProducto, product.update);
router.delete("/product/:id", product.delete);

export default router;
