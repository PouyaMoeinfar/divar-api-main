const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");

dotenv.config();

const app = express();
const port = process.env.PORT || 3400;

require("./src/config/mongoose.config");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(mainRouter);
SwaggerConfig(app);
NotFoundHandler(app);
AllExceptionHandler(app);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server: http://localhost:${port}`);
  });
}

module.exports = app;
