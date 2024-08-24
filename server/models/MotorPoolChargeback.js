import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  account: { type: String, required: false },
  ReservedBy: { type: String, required: false },
  Description: { type: String, required: false },
  destination: { type: String, required: false },
  Event_ID: { type: Number, required: false },
  StartTime: { type: Date, required: false },
  EndTime: { type: Date, required: false },
  RoomName: { type: String, required: false },
  startMileage: { type: Number, default: null },
  endMileage: { type: Number, default: null },
  driver: { type: String, required: false, default: "TBD" },
  driverhours: { type: Number, required: false, default: 0 },
  milesDriven: { type: Number, required: false, default: 0 },
  driverCost: { type: Number, required: false, default: 0 },
  mileageCost: { type: Number, required: false, default: 0 },
  cost: { type: Number, required: false, default: 0 },
  driverrental: { type: Number, default: null },
  driverfuel: { type: Number, default: null },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
