const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection is established!"))
  .catch((error) => console.log("Connection Failed!", error));
