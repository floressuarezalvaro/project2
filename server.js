const express = require("express");
var session = require("express-session");
const app = express();
const db = require("./models");

require("dotenv").config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`listening at: http://${HOST}:${PORT}`);
  });
});
