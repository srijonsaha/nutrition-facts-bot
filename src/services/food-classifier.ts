// eslint-disable-next-line @typescript-eslint/no-var-requires
const Clarifai = require("clarifai");

export default class FoodClassifier {
  private static readonly app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY });
  private imgURL: string;

  constructor(imgURL: string) {
    this.imgURL = imgURL;
  }

  public async classify(): Promise<string> {
    try {
      const res = await FoodClassifier.app.models.predict(Clarifai.FOOD_MODEL, this.imgURL);
      return res?.outputs[0]?.data?.concepts[0]?.name;
    } catch (err) {
      console.error(`Food classification failed. Error: ${err}`);
    }
  }
}
