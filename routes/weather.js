const router = require("express").Router();
const { requestHandler } = require('../helpers/apiRequest');
const { generateErrorResponse } = require('../helpers/utils');

const getJson = (data) => {
  let forecast = data.forecast.forecastday[0].hour.map(obj => ({
    time: obj.time,
    temp_f: obj.temp_f,
  }));
  return { current: { temp_f: data.current.temp_f }, forecast };
};

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
    const responseJson = getJson(weatherResponse.data);
    return res.status(200).json(responseJson);
  } catch (error) {
    console.error('\n error when fetching weather data : ', error);
    return res.status(error.statuscode || 500).json(generateErrorResponse(error.statuscode || 500, (error && error.metadata) || {}, {}));
  }
});

module.exports = router;