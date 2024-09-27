import { HTTP_CODES } from "../constant";
import db from "../database/db";
import { ICreateItem } from "../interfaces";
import { items } from "../database/schema";
import { CustomError } from "../utils";
import { eq } from "drizzle-orm";

export const createNewItemRow = async (
  location_id: number,
  createNewItemPayload: ICreateItem
) => {
  const { name, type, length, width, height } = createNewItemPayload;
  try {
    const result = await db
      .insert(items)
      .values({
        name,
        location_id,
        length,
        height,
        width,
        type,
      })
      .returning();
    return result[0];
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Failed to create new location",
      HTTP_CODES.BAD_GATEWAY
    );
  }
};

export const retrieveItemList = async () => {
  try {
    const result = await db.select().from(items);
    return result;
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Failed to retrieve item list",
      HTTP_CODES.BAD_GATEWAY
    );
  }
};

export const retrieveItemById = async (item_id: number) => {
  try {
    const result = await db.select().from(items).where(eq(items.id, item_id));
    return result[0];
  } catch (err) {
    console.log(err);
    throw new CustomError("Failed to get item by id", HTTP_CODES.BAD_GATEWAY);
  }
};

export const patchItemLocation = async (
  item_id: number,
  location_id: number
) => {
  try {
    const result = await db
      .update(items)
      .set({
        location_id,
      })
      .where(eq(items.id, item_id))
      .returning();
    return result[0];
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Failed to update item location",
      HTTP_CODES.BAD_GATEWAY
    );
  }
};

export const deleteItemRowById = async (item_id: number) => {
  try {
    await db.delete(items).where(eq(items.id, item_id));
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Failed to delete item by id",
      HTTP_CODES.BAD_GATEWAY
    );
  }
};
