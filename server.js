const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./src/index");
const hotelRouter = require("./routes/hotelReservation");
const { connectMongo } = require("./db/connection");
const { authenticateToken } = require("./src/middleware/auth");
const { getToken, refreshToken } = require("./src/utils/auth_controller");
const app = express();
app.use(cookieParser());

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Await server start before applying middleware
  connectMongo("sample");
  connectMongo("sample_mflix");
  const middleWare = [
    cors({
      origin: "http://localhost:4200", // Frontend URL
    }),
    express.json(),
  ];

  app.get("/api/token", ...middleWare, (req, res) => {
    return getToken(req, res);
  });

  app.get("/api/refresh-token", (req, res) => {
    return refreshToken(req, res);
  });

  app.use(
    "/hotel-graphql",
    ...middleWare,
    authenticateToken,
    expressMiddleware(server),
    hotelRouter
  );

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((err) => console.error("Error starting server:", err));
