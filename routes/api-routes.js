var db = require("../models");
var passport = require("../config/passport");

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
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};
