const express = require("express");

const ExpressError = require("./expressError");
const app = express();

// Parse request bodies for JSON
app.use(express.json());

const testRouter = require("./routes/example");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
app.use("/api/user", userRouter);
app.use("/api/test", testRouter);
app.use("/api/auth", authRouter);

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
