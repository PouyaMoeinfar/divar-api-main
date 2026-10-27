const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");

dotenv.config();
require("./src/config/mongoose.config");

const app = express();

const corsOptions = {
  origin: [
    "https://divar-files-main.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(mainRouter);
SwaggerConfig(app);
NotFoundHandler(app);
AllExceptionHandler(app);


if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server: http://localhost:${port}`);
  });
}

module.exports = app;
