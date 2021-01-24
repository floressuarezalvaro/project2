var db = require("../models");

module.exports = (app) => {
  app.get("/api/bars", (req, res) => {
    db.Bar.findAll({}).then((dbGetAll) => res.json(dbGetAll));
  });

  app.get("/api/bars/:id", (req, res) => {
    db.Bar.findAll({
      where: {
        id: req.params.id,
      },
    }).then((dbGetBar) => {
      res.json(dbGetBar);
    });
  });

  app.post("/api/bars/barName", (req, res) => {
    const barName = req.body.barName;
    db.Bar.create({
      barName,
    })
      .then((resBarName) => res.json(resBarName))
      .catch((err) => res.json(err));
  });

  app.delete("/api/bars/:id", (req, res) => {
    db.Bar.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbDeleteBar) => {
      res.json(dbDeleteBar);
    });
  });

  app.put("/api/bars/:id", (req, res) => {
    db.Bar.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((dbUpdateBar) => {
      res.json(dbUpdateBar);
    });
  });
};
