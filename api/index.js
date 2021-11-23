const bodyParser = require("body-parser");
const app = require("express")();

const sales = require("./sales.js");

app.use(bodyParser.json());

app.post("/sales", sales);

app.use((req, res, next) => {
  next();
});

module.exports = app;
