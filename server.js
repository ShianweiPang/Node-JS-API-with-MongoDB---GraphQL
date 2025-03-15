const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./src/index");
const hotelRouter = require("./routes/hotelReservation");
const { connectMongo } = require("./db/connection");
const app = express();

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Await server start before applying middleware
  connectMongo("sample");
  connectMongo("sample_mflix");
  const middleWare = [cors(), express.json()];

  app.use(
    "/hotel-graphql",
    ...middleWare,
    expressMiddleware(server),
    hotelRouter
  );

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((err) => console.error("Error starting server:", err));
