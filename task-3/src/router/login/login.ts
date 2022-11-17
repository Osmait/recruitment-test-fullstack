import { Router } from "express";
import { Login } from "../../controller/login";
import { validateInfo } from "../../middleware/validationUsers";

const router = Router();
const login = new Login();

router.post("/login", validateInfo, login.login);

export default router;
