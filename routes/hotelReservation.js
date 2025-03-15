const express = require("express");
const router = express.Router();

// Middleware for logging requests to /something
router.use((req, res, next) => {
  console.log(`Request received at /something: ${req.method} ${req.url}`);
  next();
});

module.exports = router; // Export the router
