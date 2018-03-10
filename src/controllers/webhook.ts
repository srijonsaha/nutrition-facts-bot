import express from "express";
import Controller from "./controller";

export default class WebhookController implements Controller{
  public router: express.Router;
  private endpoint: string;

  constructor() {
    this.endpoint = "/webhook";
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.endpoint, this.handlePOST.bind(this));
    this.router.get(this.endpoint, this.handleGET.bind(this));
  }

  private handlePOST() {
    console.log(`POST ${this.endpoint}`);
  }

  private handleGET() {
    console.log(`GET ${this.endpoint}`);
  }
}
