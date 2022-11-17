import { Router } from "express";
import { User } from "../../controller/user";
import { validateJWT } from "../../middleware/validationJWT";
import { validateInfo } from "../../middleware/validationUsers";

const router = Router();
const user = new User();

router.post("/user", validateInfo, user.create);
router.get("/user", user.findAll);
router.get("/user/:id", user.finOne);
router.put("/user/:id", validateInfo, user.update);
router.delete("/user/:id", user.detele);
router.get("/perfil", validateJWT, user.perfil);

export default router;
