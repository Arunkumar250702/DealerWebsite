const { isDatabaseConnected } = require("../config/database");

function requireDb(req, res, next) {
  if (!isDatabaseConnected()) {
    return res.status(503).json({
      message:
        "Database is not connected. Please try again in a minute or contact support.",
    });
  }
  next();
}

module.exports = requireDb;
