const express = require("express");
const { connect } = require("./config/db");
const { userRouter } = require("./routers/user.route");
const { auth } = require("./middlewares/auth");
const { logger } = require("./middlewares/logger");
const { log, error } = require("winston");
const { ipRouter } = require("./routers/ip.router");

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  logger.log("error",err.message);
  
  res.status(500).json({ error: "Internal server error" });
});

app.get("/", (req, res) => {

  res.send("Home page");

});

app.use("/users", userRouter);
app.use("/ip",ipRouter);


app.listen(4000, async () => {
  try {
    await connect;
    logger.log("info","db is connected")
  } catch (error) {
    console.log(error);
    logger.log("error",error)
  }
  console.log("server is running");
});
