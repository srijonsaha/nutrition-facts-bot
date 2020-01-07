# Nutrition Facts Bot
Nutrition Facts Bot is a chatbot that responds to your pictures of food with nutritional facts such as calories, sugar, protein etc. It's hosted on Facebook Messenger. Watch a demo [here](https://youtu.be/CRJ8--mFamY).

<a href="https://youtu.be/CRJ8--mFamY">
  <p align="center">
    <img src="/images/screenshot.png" />
  </p>
</a>

## Dependencies
- [Node.js](https://nodejs.org)
- [Facebook Messenger API](https://developers.facebook.com/docs/messenger-platform/)
- [Clarifai API](https://www.clarifai.com/developer)
- [FoodData Central API](https://fdc.nal.usda.gov/api-guide.html)

## Setup 
The chatbot requires the `CLARIFAI_API_KEY` and `FDC_API_KEY` environment variables with the API keys, as well as `VERIFY_TOKEN` and `PAGE_ACCESS_TOKEN` for the Facebook Messenger webhook.
- `npm run build` to compile from TypeScript
- `npm start` to run the web server
