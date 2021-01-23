var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
require("dotenv").config()


module.exports = (app) => {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(`This user has been logged ${req.user}`);
  });

  app.post("/api/createAccount", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // place logout here

  app.get("/api/user_info", (req, res) => {
    if (!req.user) {
      res.json({
        email: "No user email",
        id: "No IDs",
      });
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  app.get("/api/searchLoc", (req, res) => {
    let searchLocation = req.query.query
    console.log(req.query)
    axios.get(
        `http://beermapping.com/webservice/locquery/${process.env.apikey}/${searchLocation}&s=json`
      )
        .then((data) => {
          console.log(data.data)
          res.json(data.data)
        });
  })
};
