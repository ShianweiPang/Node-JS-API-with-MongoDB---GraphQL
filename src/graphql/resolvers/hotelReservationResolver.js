const { getDB } = require("../../../db/connection");
const dbName = "sample";

const hotelReservationResolver = {
  Query: {
    // record: async () => {
    //   let collection = await getDB().collection("HotelReservations");
    //   let query = { _id: new ObjectId(id) };

    //   return await collection.findOne(query);
    // },
    records: async (_, __, context) => {
      let collection = await getDB(dbName).collection("HotelReservation");
      const records = await collection.find({}).toArray();
      return records;
    },
  },
  Mutation: {
    createHotelReservation: async (
      _,
      {
        hotelRecordId,
        guestName,
        guestEmail,
        roomNumber,
        checkInDate,
        checkOutDate,
      },
      context
    ) => {
      let collection = await getDB(dbName).collection("HotelReservation");
      const insert = await collection.insertOne({
        hotelRecordId,
        guestName,
        guestEmail,
        roomNumber,
        checkInDate,
        checkOutDate,
      });
      if (insert.acknowledged)
        return {
          hotelRecordId,
          guestName,
          guestEmail,
          roomNumber,
          checkInDate,
          checkOutDate,
          id: insert.insertedId,
        };
      return null;
    },
  },
};

module.exports = hotelReservationResolver;
