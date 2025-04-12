const { getDB } = require("../../../db/connection");
const { encrypt, decrypt } = require("../../utils/utils");
const dbName = "sample";

const hotelReservationResolver = {
  Query: {
    record: async (_, args, context) => {
      const hotelRecordId = args.hotelRecordId;
      let collection = await getDB(dbName).collection("HotelReservation");
      const record = await collection.findOne({ hotelRecordId: hotelRecordId });
      record.hotelRecordId = encrypt(record.hotelRecordId);
      console.log(record.hotelRecordId);
      const a = decrypt(record.hotelRecordId);
      console.log(a);
      return record;
    },
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
    deleteHotelReservation: async (_, args, context) => {
      let collection = await getDB(dbName).collection("HotelReservation");
      const writeResult = await collection.deleteOne(
        { hotelRecordId: args.hotelRecordId },
        true
      );
      return {
        acknowledged: writeResult.acknowledged,
        deletedCount: writeResult.deletedCount,
      };
    },
    updateHotelReservation: async (_, args, context) => {
      const hotelRecordId = args.hotelRecordId;
      let collection = await getDB(dbName).collection("HotelReservation");
      const updateResult = await collection.updateOne(
        { hotelRecordId: hotelRecordId },
        {
          $set: {
            guestName: args.guestName,
            guestEmail: args.guestEmail,
            roomNumber: args.roomNumber,
            checkInDate: args.checkInDate,
            checkOutDate: args.checkOutDate,
          },
        }
      );
      console.log(updateResult);
      return updateResult;
    },
  },
};

module.exports = hotelReservationResolver;
