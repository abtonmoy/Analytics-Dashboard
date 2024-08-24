import User from "../models/user.js";
import AuthUser from "../models/auth_User.js";
import Driver from "../models/driver.js";
import Cars from "../models/cars.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import Event from "../models/MotorPoolChargeback.js";

export const getChargebacks = async (req, res) => {
  try {
    const { sort = "", order = "", search = "" } = req.query;

    const sortCriteria = sort ? { [sort]: order === "desc" ? -1 : 1 } : {};
    const searchCriteria = search
      ? {
          $or: [
            { account: { $regex: search, $options: "i" } },
            { ReservedBy: { $regex: search, $options: "i" } },
            { Description: { $regex: search, $options: "i" } },
            { destination: { $regex: search, $options: "i" } },
            { driver: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const events = await Event.find(searchCriteria).sort(sortCriteria);

    res.status(200).json({ transactions: events });
  } catch (error) {
    console.error("Error fetching chargebacks:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createChargeback = async (req, res) => {
  const newChargeback = new Event(req.body);

  try {
    await newChargeback.save();
    res.status(201).json(newChargeback);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAuthUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuthUser.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addDriver = async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    await Driver.findByIdAndDelete(id);
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await Cars.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCar = async (req, res) => {
  const car = new Cars(req.body);
  try {
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await Cars.findByIdAndDelete(id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(
      ({ month }) => month === currentMonth
    );
    const todayStats = overallStat[0].dailyData.find(
      ({ date }) => date === currentDay
    );

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
