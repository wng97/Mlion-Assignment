import { eq } from "drizzle-orm";
import { HTTP_CODES } from "../constant";
import db from "../database/db";
import { ICreateLocation } from "../interfaces";
import { locations } from "../database/schema";
import { CustomError } from "../utils";

export const createNewLocationRow = async (
  createNewLocationPayload: ICreateLocation
) => {
  const { name, coordinate } = createNewLocationPayload;
  try {
    const result = await db
      .insert(locations)
      .values({
        name,
        coordinate,
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

export const retrieveLocationList = async () => {
  try {
    const result = await db.select().from(locations);
    return result;
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Failed to get location list",
      HTTP_CODES.BAD_GATEWAY
    );
  }
};

export const retrieveLocationRowById = async (location_id: number) => {
  try {
    const result = await db
      .select()
      .from(locations)
      .where(eq(locations.id, location_id));
    return result[0];
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Failed to get location by id",
      HTTP_CODES.BAD_GATEWAY
    );
  }
};

export const patchLocationNameById = async (
  location_id: number,
  name: string
) => {
  try {
    const result = await db
      .update(locations)
      .set({
        name,
      })
      .where(eq(locations.id, location_id))
      .returning();
    return result[0];
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Failed to update location name",
      HTTP_CODES.BAD_GATEWAY
    );
  }
};

export const deleteLocationRowById = async (location_id: number) => {
  try {
    await db.delete(locations).where(eq(locations.id, location_id));
  } catch (err) {
    console.log(err);
    throw new CustomError("Failed to delete location", HTTP_CODES.BAD_GATEWAY);
  }
};
