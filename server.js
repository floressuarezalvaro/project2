const express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
const db = require("./models");
require("dotenv").config();




const HOST = process.env.HOST;
// const PORT = process.env.PORT;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes.js")(app);
require("./routes/user-routes.js")(app);
require("./routes/bars-routes.js")(app);


var PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`listening at: http://${HOST}:${PORT}`);
  });
});

