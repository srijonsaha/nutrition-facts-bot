import Server from "./server";
import WebhookController from "./controllers/webhook";

new Server(Number(process.env.PORT), [new WebhookController()]).listen();
