import dotenv from "dotenv";
import Server from "./server";
import WebhookController from "./controllers/webhook";

dotenv.config();
new Server(Number(process.env.PORT), [new WebhookController()]).listen();
