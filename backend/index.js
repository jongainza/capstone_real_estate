const express = require("express");
const cors = require("cors");
const ExpressError = require("./expressError");
const app = express();

// Parse request bodies for JSON(allows JSON when we send a request to the API)
app.use(express.json());

app.use(cors());

const testRouter = require("./routes/example");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const { authenticateJWT } = require("./middleware/auth.middleware");
app.use(authenticateJWT);
app.use("/api/user", userRouter);
app.use("/api/test", testRouter);
app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.json({
    message,
    statusCode,
    success: false,
  });
});

// 404 handler
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  // pass err to the next middleware
  return next(err);
});

// general error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
