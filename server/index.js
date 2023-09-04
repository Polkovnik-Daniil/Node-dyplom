require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHanlder = require("./middleware/ErrorHandlingMiddleware");
const logger = require("./logs/logger");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);

//Обработка ошибок, последний Middleware
app.use(errorHanlder);
logger.info("Start app");
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    require("./models/DefaultData");  //Загружаю дефолтные данные
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    logger.info(`Server started on port ${PORT}`);
  } catch (e) {
    logger.info(value);
    console.log(e);
  }
};
start();
