const router = require("express").Router();
const { requestHandler } = require('../helpers/apiRequest');
const { generateErrorResponse } = require('../helpers/utils');

router.get('/', async (req, res) => {
  try {
    const weatherResponse = await requestHandler({
      url: process.env.WEATHER_URL,
      method: "GET",
      headers: {
        'accept': "application/json",
        'content-type': "application/json",
      },
    });
    return res.status(200).json(weatherResponse.data);
  } catch (error) {
    console.error('\n error when fetching weather data : ', error);
    return res.status(error.statuscode || 500).json(generateErrorResponse(error.statuscode || 500, (error && error.metadata) || {}, {}));
  }
});

module.exports = router;