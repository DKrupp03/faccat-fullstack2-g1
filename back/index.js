const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

//app.use(
//  cors({ origin: "http://localhost:5173" })
//);

app.use(cors());

app.use(express.json());

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const productsRoutes = require("./routes/products");
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("API conected!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});