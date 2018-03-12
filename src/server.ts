import express from "express";
import bodyParser from "body-parser";
import Controller from "./controllers/controller";

export default class Server {
  private app: express.Application;
  private port: number;
  private controllers: Controller[];

  constructor(port: number, controllers: Controller[]) {
    this.port = port || 3000;
    this.controllers = controllers;
    this.app = express().use(bodyParser.json());
    this.setupRoutes();
  }

  public listen(): void {
    this.app.listen(this.port);
  }

  private setupRoutes(): void {
    for (const controller of this.controllers) {
      this.app.use("/", controller.router);
    }
  }
}
