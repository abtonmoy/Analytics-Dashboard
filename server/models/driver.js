import mongoose from "mongoose";

const DriversSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    largeVan: {
      type: Boolean,
      required: true,
      default: false,
    },
    group: {
      type: String,
      required: true,
    },
    birth: {
      type: Date,
      required: false,
      trim: true,
    },
    driversLicense: {
      type: String,
      required: false,
    },
    dateAdded: {
      type: Date,
      required: false,
    },
    dateExpiration: {
      type: Date,
      required: false,
    },
    cellphone: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    emerald: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      enum: ["driver", "admin", "developer", "guest"],
      default: "admin",
    },
    "21+": {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", DriversSchema);

export default Driver;
