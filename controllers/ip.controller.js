const axios = require("axios");
const { redisClient } = require("../helpers/redis");
const { json } = require("express");
const { User } = require("../models/user.model");



const getIpData = async (req, res) => {
  try {
    const ip = req.params.ip 

    const isCache = await redisClient.get(ip);

    if (isCache) {
      return res.send({ data: (isCache) });
    }

    const response = await axios.get(
      `https://ipapi.co/${ip}/json/`
    );

    const weatherData = response.data;

    redisClient.set(city, JSON.stringify(weatherData),"EX",21600);

    return res.send({ data: weatherData });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { getIpData };
