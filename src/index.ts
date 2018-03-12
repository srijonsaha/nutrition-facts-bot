import Server from "./server";
import WebhookController from "./controllers/webhook";

const server = new Server(Number(process.env.PORT), [new WebhookController()]);

server.listen();
