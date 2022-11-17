import express, { application } from "express";
import cors from "cors";
import routerUser from "../router/users/user";

import routerProduct from "../router/product/product";
import routerLogin from "../router/login/login";

class Server {
  private PORT = process.env.PORT;
  private app = application;

  constructor() {
    this.app = express();
    this.PORT;
    this.middlewares();
    this.routers();
  }
  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routers() {
    this.app.use("/api", routerUser);
    this.app.use("/api", routerLogin);
    this.app.use("/api", routerProduct);
  }

  public listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server listen  port ${this.PORT}`);
    });
  }
}

export default Server;
