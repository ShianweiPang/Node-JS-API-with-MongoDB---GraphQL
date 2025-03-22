const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign({ user }, process.env.ACCESS_SECRET, { expiresIn: "1h" });
const generateRefreshToken = (user) =>
  jwt.sign({ user }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

// Issue Tokens
const getToken = (req, res) => {
  const user = { id: "guest", role: "visitor", timestamp: Date.now() };
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.json({ accessToken, refreshToken });
};

// Refresh Access Token
const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(decoded.user);
    res.json({ accessToken: newAccessToken });
  });
};

module.exports = { getToken, refreshToken };
