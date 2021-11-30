const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const cors=require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const roleRouter = require("./routers/routes/todos");
app.use( roleRouter);

const registerRouter = require("./routers/routes/user");
app.use(registerRouter);

const loginRouter = require("./routers/routes/user");
app.use( loginRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});