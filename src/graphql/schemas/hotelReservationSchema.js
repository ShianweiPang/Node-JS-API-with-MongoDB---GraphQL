const { gql } = require("graphql-tag");

const typeDefs = gql`
  scalar Date

  type HotelReservation {
    id: ID!
    hotelRecordId: String!
    guestName: String!
    guestEmail: String!
    roomNumber: Int!
    checkInDate: Date!
    checkOutDate: Date!
    status: String
  }

  type Query {
    records: [HotelReservation]
  }

  type Mutation {
    createHotelReservation(
      guestName: String!
      guestEmail: String!
      roomNumber: Int!
      checkInDate: Date!
      checkOutDate: Date!
    ): HotelReservation
  }
`;

module.exports = typeDefs;
