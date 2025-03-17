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
      return records.map((record) => ({
        id: record._id.toString(), // Convert `_id` to string and assign to `id`
        hotelRecordId: record.hotelRecordId,
        guestName: record.guestName,
        guestEmail: record.guestEmail,
        roomNumber: record.roomNumber,
        checkInDate: record.checkInDate,
        checkOutDate: record.checkOutDate,
      }));
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
      const lastRecord = await collection.findOne({}, { sort: { _id: -1 } });
      let lastId = 0;
      if (lastRecord) {
        lastId = parseInt(lastRecord.hotelRecordId.slice(3));
      }
      lastId += 1;
      const prefix = "HBR";
      hotelRecordId = `${prefix}${lastId.toString().padStart(4, "0")}`;

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
          status: "success",
        };
      else {
        return {
          guestName,
          guestEmail,
          roomNumber,
          checkInDate,
          checkOutDate,
          status: "failed",
        };
      }
    },
  },
};

module.exports = hotelReservationResolver;
