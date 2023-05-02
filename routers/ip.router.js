const express=require('express');
const { auth } = require('../middlewares/auth');
const { getIpData } = require('../controllers/ip.controller');

const ipRouter=express.Router();

ipRouter.get("/:ip",auth,getIpData);

module.exports={ipRouter};