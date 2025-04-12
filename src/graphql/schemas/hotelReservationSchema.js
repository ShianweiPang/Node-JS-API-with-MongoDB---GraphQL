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

  type DeleteResponse {
    acknowledged: Boolean!
    deletedCount: Int!
  }

  type UpdateResponse {
    acknowledged: Boolean!
    matchedCount: Int!
    modifiedCount: Int!
  }

  type Query {
    records: [HotelReservation]
    record(hotelRecordId: String!): HotelReservation
  }

  type Mutation {
    createHotelReservation(
      guestName: String!
      guestEmail: String!
      roomNumber: Int!
      checkInDate: Date!
      checkOutDate: Date!
    ): HotelReservation
    deleteHotelReservation(hotelRecordId: String!): DeleteResponse
    updateHotelReservation(
      hotelRecordId: String!
      guestName: String!
      guestEmail: String!
      roomNumber: Int!
      checkInDate: Date!
      checkOutDate: Date!
    ): UpdateResponse
  }
`;

module.exports = typeDefs;
