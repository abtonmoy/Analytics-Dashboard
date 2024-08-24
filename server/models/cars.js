import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
});
const Cars = mongoose.model("Car", CarSchema);

export default Cars;
