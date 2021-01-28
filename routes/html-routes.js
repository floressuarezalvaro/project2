// Dependencies
const path = require("path");

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/HTML/index.html"));
  });
  // login route loads login.html
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/HTML/login.html"));
  });

  // signup route loads signup.html
  app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/HTML/signup.html"));
  });
  //search with out modals
  app.get("/search", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/HTML/search.html"));
  });

  app.get("/addBar", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/HTML/addBar.html"));
  });
  app.get("/updateBar", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/HTML/updateBar.html"));
  });
  app.get("/deleteBar", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/HTML/deleteBar.html"));
  });
};
