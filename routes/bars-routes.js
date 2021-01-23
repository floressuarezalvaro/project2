var db = require("../models");

module.exports = (app) => {
  app.get("/api/:barName", (req, res) => {
    db.GET.findAll({
      where: {
        barName: req.params.barName,
      },
    }).then((dbGET) => {
      res.json("Nothing found yet");
    });
  });

  app.post("/api/barName", (req, res) => {
    const barName = req.body.barName;
    db.GET.create({
      barName,
    })
      .then((resBarName) => res.json(resBarName))
      .catch((err) => res.json(err));
  });
};
