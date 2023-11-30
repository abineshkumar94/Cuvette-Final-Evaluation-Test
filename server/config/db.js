const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose
    .connect(
      "mongodb+srv://abi1205ak:tv81NFGoI1tNgeWl@cluster0.czh7jwa.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB connected sucessfully"))
    .catch((error) => {
      console.log("DB connection is not sucessfully");
      console.log(error);
    });
};

module.exports = connectWithDb;
