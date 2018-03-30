import request from "request-promise-native";
import FoodClassifier from "./food-classifier";
import NutritionService from "./nutrition-service";

enum Message {
  GENERIC_REPLY = "Send me a picture of your food and I will give you nutritional facts about it!",
  NO_FOOD_REPLY = "Sorry, couldn't identify the food in your picture.",
  NO_NUTRITION_REPLY = "Sorry, couldn't get nutritional info about your food."
}

export default class Chatbot {
  public async respondToMsg(sender: string, msg: any): Promise<void> {
    if (msg.text) {
      this.sendMsg(sender, Message.GENERIC_REPLY);
    } else if (msg.attachments && msg.attachments[0].type === "image") {
      const imgURL = msg.attachments[0].payload.url;
      await this.sendNutritionMsg(imgURL, sender);
    }
  }

  private async sendNutritionMsg(imgURL: any, sender: string): Promise<void> {
    const food = await new FoodClassifier(imgURL).classify();
    if (food) {
      try {
        const nutrients = await NutritionService.getNutritionFacts(food);
        let resMsg = `${food}'s nutrition:\n`;
        for (const nutrient of nutrients) {
          resMsg += `${nutrient}\n`;
        }
        this.sendMsg(sender, resMsg);
      } catch {
        this.sendMsg(sender, Message.NO_NUTRITION_REPLY);
      }
    } else {
      this.sendMsg(sender, Message.NO_FOOD_REPLY);
    }
  }

  private async sendMsg(receiver: string, msg: string): Promise<void> {
    try {
      await request.post("https://graph.facebook.com/v5.0/me/messages", {
        // eslint-disable-next-line @typescript-eslint/camelcase
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        json: {
          recipient: {
            id: receiver
          },
          message: {
            text: msg
          }
        }
      });
    } catch (err) {
      console.error(`Couldn't send message. Error: ${err}`);
    }
  }
}
