const mongoose = require("mongoose");

const connectdb = () => {
  mongoose
    .connect(process.env.URI, {
      dbName: "customizegoatour",
    })
    .then((c) =>
      console.log(`Goa Tour Database Connected on host ${c.connection.host}`)
    )
    .catch((e) => console.log(e));
};

module.exports = connectdb;
