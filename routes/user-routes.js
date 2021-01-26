var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
require("dotenv").config();

module.exports = (app) => {
  app.post(
    "/api/users/login",
    passport.authenticate("local"),
    function (req, res) {
      res.json(req.user);
    }
  );

  app.get("/api/users/userEmail", (req, res) => {
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

  app.post("/api/users/createAccount", (req, res) => {
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
  app.get("/api/users/:id", (req, res) => {
    db.User.findAll({
      where: {
        id: req.params.id,
      },
    }).then((dbGetUser) => res.json(dbGetUser));
  });

  app.put("/api/users/updateAccount/:id", (req, res) => {
    db.User.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((dbUpdateUser) => res.json(dbUpdateUser));
  });

  app.delete("/api/users/deleteAccount/:id", (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbDestroyUser) => res.json(dbDestroyUser));
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/searchLoc", (req, res) => {
    let searchLocation = req.query.query;
    console.log(req.query);
    axios
      .get(
        `http://beermapping.com/webservice/locquery/${process.env.apikey}/${searchLocation}&s=json`
      )
      .then((data) => {
        console.log(data.data);
        res.json(data.data);
      });
  });
};
