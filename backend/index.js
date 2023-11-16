const express = require("express");
const app = express();
const port = 3000; // Update the port to 3000
const mongoDB = require("./db");
mongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001"); // Update the origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));

app.use("/api", require("./Routes/DisplayData.js"));

app.use("/api", require("./Routes/OrderData.js"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
