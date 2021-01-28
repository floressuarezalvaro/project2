var db = require("../models");
var auth = require("../config/middleware/isAuthentication");
module.exports = (app) => {
  app.get("/api/bars", (req, res) => {
    db.Bar.findAll({}).then((dbGetAll) => res.json(dbGetAll));
  });

  app.get("/api/bars/:id", (req, res) => {
    db.Bar.findAll({
      where: {
        id: req.params.id,
      },
    }).then((dbGetBar) => res.json(dbGetBar));
  });

  app.post("/api/bars/barName", auth, (req, res) => {
    const barName = req.body.barName;
    const UserId = req.body.UserId;
    db.Bar.create({
      barName,
      barRating: req.body.barRating,
      UserId: req.user.id,
      barAddress: req.body.barAddress,
      barCity: req.body.barCity,
      barState: req.body.barState,
      barReviewLink: req.body.barReviewLink,
      barPhone: req.body.barPhone,
      barWebsite: req.body.barWebsite,
    }).then((resBarName) => res.json(resBarName));
  });

  app.delete("/api/bars/:id", (req, res) => {
    db.Bar.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbDestroyBar) => res.json(dbDestroyBar));
  });

  app.put("/api/bars/update", (req, res) => {
    db.Bar.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbUpdateBar) => res.json(dbUpdateBar));
  });
};
