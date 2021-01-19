const express = require("express");
const app = express();
const db = require("./models");

require("dotenv").config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sequelize.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`listening at: http://${HOST}:${PORT}`);
  });
});
