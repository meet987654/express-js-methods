const express = require("express");

const app = express();

let totalRequestTime = 0;
let requestCount = 0;

// Middleware to calculate request time
function requestTimeLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    totalRequestTime += duration;
    requestCount += 1;
    console.log(`Request took ${duration}ms`);
  });
  next();
}

// Kidney middleware (unchanged)
function kidneyMiddleware(req, res, next) {
  const kidneyId = req.query.kidneyId;
  if (!(kidneyId == 1 || kidneyId == 2)) {
    return res.status(404).json({
      msg: "kidneys are not correct",
    });
  }
  next();
}

// User middleware (unchanged)
function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (!(username === "meet" && password === "pass")) {
    return res.status(404).json({
      msg: "incorrect inputs",
    });
  }
  next();
}

// Route to check kidney health
app.get(
  "/health-request",
  requestTimeLogger, // Log request time
  userMiddleware,
  kidneyMiddleware,
  (req, res) => {
    res.send("your kidney is healthy");
  }
);

// Route to get the average response time
app.get("/average-time", (req, res) => {
  if (requestCount === 0) {
    return res.json({ averageTime: "No requests handled yet." });
  }
  const averageTime = totalRequestTime / requestCount;
  res.json({
    averageTime: `${averageTime.toFixed(2)}ms`,
    totalRequests: requestCount,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
