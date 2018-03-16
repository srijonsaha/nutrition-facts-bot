import request from "request-promise-native";

export default class NutritionService {
  private static readonly apiKey = process.env.FDC_API_KEY;
  private static readonly apiURL = "https://api.nal.usda.gov/fdc/v1/";
  private static readonly nutrientUnits = {
    calories: "",
    fat: "g",
    carbohydrates: "g",
    sugars: "g",
    sodium: "mg",
    cholesterol: "mg",
    protein: "g"
  };

  public static async getNutritionFacts(food: string): Promise<string[]> {
    const id = await NutritionService.searchFoodId(food);
    return await NutritionService.getNutritionInfo(id);
  }

  private static async searchFoodId(food: string): Promise<string> {
    try {
      const res = await request.get(
        `${NutritionService.apiURL}search?api_key=${NutritionService.apiKey}&generalSearchInput=${food}`,
        {
          json: true
        }
      );

      const id = res?.foods[0]?.fdcId;
      if (!id) {
        throw Error(`Nutrition Search Failed. No Food Id found.`);
      }

      return id;
    } catch (err) {
      throw Error(`Nutrition Search Failed. Error: ${err}`);
    }
  }

  private static async getNutritionInfo(foodId: string): Promise<string[]> {
    try {
      const res = await request.get(`${NutritionService.apiURL}${foodId}?api_key=${NutritionService.apiKey}`, {
        json: true
      });

      const nutrients = [];
      for (const [nutrient, unit] of Object.entries(NutritionService.nutrientUnits)) {
        const data = res.labelNutrients[nutrient];
        if (data) {
          nutrients.push(`${nutrient}: ${data["value"]}${unit}`);
        }
      }

      return nutrients;
    } catch (err) {
      throw new Error(`Couldn't get nutritional info. Error: ${err}`);
    }
  }
}
