import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  changeItemLocation,
} from "../controllers";

export const itemsRouter = Router();
// create item
itemsRouter.post("/create/:location_id", createItem);
//get item list
itemsRouter.get("/list", getItems);
// get item by itemId
itemsRouter.get("/:item_id", getItemById);
// update item locations
itemsRouter.put("/:item_id/location/:location_id", changeItemLocation);
// delete item by itemId
itemsRouter.delete("/:item_id", deleteItem);
