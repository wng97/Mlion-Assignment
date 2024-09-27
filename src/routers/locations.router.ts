import { Router } from "express";
import {
  createLocation,
  deleteLocation,
  getLocationById,
  getLocations,
  updateLocationName,
} from "../controllers";

export const locationsRouter = Router();

// create
locationsRouter.post("/create", createLocation);

// get all locations
locationsRouter.get("/list", getLocations);

// get location by id
locationsRouter.get("/:location_id", getLocationById);

// update location by id
locationsRouter.put("/:location_id", updateLocationName);

// delete location by id
locationsRouter.delete("/:location_id", deleteLocation);
