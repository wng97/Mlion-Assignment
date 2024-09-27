import { Router } from "express";
import { locationsRouter } from "./locations.router";
import { itemsRouter } from "./items.router";

const routers = Router();

//Locations
routers.use("/locations", locationsRouter);
routers.use("/items", itemsRouter);

export default routers;
