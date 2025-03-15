const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { GraphQLDateTime } = require("graphql-scalars");

const hotelReservationTypeDefs = require("./graphql/schemas/hotelReservationSchema");
const hotelReservationResolvers = require("./graphql/resolvers/hotelReservationResolver");

const typeDefs = mergeTypeDefs([hotelReservationTypeDefs]);
const resolvers = mergeResolvers([
  hotelReservationResolvers,
  { Date: GraphQLDateTime }, // Include Date scalar resolver
]);

module.exports = { typeDefs, resolvers };
