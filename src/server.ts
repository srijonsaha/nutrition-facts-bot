import express from "express";
import bodyParser from "body-parser"
import Controller from "./controllers/controller";

export default class Server {
  private app: express.Application;
  private port: number;
  private controllers: Controller[];

  constructor(port: number, controllers: any[]) {
    this.port = port;
    this.controllers = controllers;
    this.app = express().use(bodyParser.json());
    this.setupRoutes();
  }

  public listen() {
    this.app.listen(this.port || 3000);
  }

  private setupRoutes() {
    for (const controller of this.controllers) {
      this.app.use("/", controller.router);
    }
  }
}
