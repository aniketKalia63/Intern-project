const path = require("path");
const express = require("express");

/* const mongoSanitize = require("express-mongo-sanitize"); */
/* const compression = require("compression"); */
/* const xss = require("xss-clean"); */
/* const hpp = require("hpp"); */
const cookieParser = require("cookie-parser");
/* const rateLimit = require("express-rate-limit"); */
const AppError = require("./util/appError");
const registerRouter = require("./router/registerRouter");
const userRouter = require("./router/userRouter");
const viewRouter = require("./router/viewRoutes");
//const ErrorHandler = require("./controller/errorCantroller");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
/* 
app.use(mongoSanitize()); */
/* app.use(xss()); */
/* app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
); */
/* app.use(compression()); */
app.use(express.static(`${__dirname}/public`));

/* 
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies);
  next();
}); 

*/

// 3) ROUTES

app.use("/", viewRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/register", registerRouter);

module.exports = app;
