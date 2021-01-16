const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { generateErrorResponse } = require('./helpers/utils');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import Routes
const weatherRoute = require("./routes/weather");

//Route Middlewares
app.use("/api/weather", weatherRoute);

app.get(["/api", '/api/health-check'], (req, res) => {
    res.status(200).json({
        message: 'healthy'});
});

app.all("*", (req, res) => {
    res.status(404).json(generateErrorResponse(404, [{code: 'CLIENT_ERROR', message: 'Route Not Found'}]));
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port - ${process.env.PORT}`);
});


module.exports = app;