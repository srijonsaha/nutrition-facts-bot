import { Router, Request, Response } from "express";
import Controller from "./controller";
import Chatbot from "../services/chatbot";

export default class WebhookController implements Controller {
  public router: Router;
  private endpoint: string;
  private chatbot: Chatbot;
  private readonly verifyToken: string;

  constructor() {
    this.endpoint = "/webhook";
    this.verifyToken = process.env.VERIFY_TOKEN;
    this.router = Router();
    this.chatbot = new Chatbot();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(this.endpoint, this.handlePOST.bind(this));
    this.router.get(this.endpoint, this.handleGET.bind(this));
  }

  private handlePOST(req: Request, res: Response): void {
    if (req.body.object === "page") {
      for (const entry of req.body.entry) {
        const webhookEvent = entry.messaging[0];
        if (webhookEvent.message) {
          this.chatbot.respondToMsg(webhookEvent.sender.id, webhookEvent.message);
        }
      }

      res.status(200).send("EVENT RECEIVED");
    } else {
      res.sendStatus(404);
    }
  }

  private handleGET(req: Request, res: Response): void {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
      if (mode === "subscribe" && token === this.verifyToken) {
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    }
  }
}
