import express from "express";
import {
  getAuthUser,
  getDrivers,
  addDriver,
  deleteDriver,
  getCars,
  addCar,
  deleteCar,
  getDashboardStats,
  getChargebacks,
  createChargeback,
} from "../controllers/general.js";

const router = express.Router();

router.get("/chargebacks", getChargebacks);
router.post("/chargebacks", createChargeback);
router.get("/user/:id", getAuthUser);
router.get("/drivers", getDrivers);
router.post("/drivers", addDriver);
router.delete("/drivers/:id", deleteDriver);
router.get("/cars", getCars);
router.post("/cars", addCar);
router.delete("/cars/:id", deleteCar);
router.get("/dashboard", getDashboardStats);

export default router;
