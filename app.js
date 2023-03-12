const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/users");
const cards = require("./routes/cards");
const { message404 } = require("./utils/constants");

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://0.0.0.0:27017/mestodb", { useNewUrlParser: true });
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: "63ffc51ff77baa70d52899e4",
  };

  next();
});
app.use("/users", users);

app.use((req, res, next) => {
  req.user = {
    _id: "63ffc51ff77baa70d52899e4",
  };

  next();
});
app.use("/cards", cards);

app.route("/:any_other")
  .get(message404)
  .post(message404)
  .put(message404)
  .patch(message404)
  .delete(message404);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
