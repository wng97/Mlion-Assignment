import { ICreateLocation, ILocation } from "../interfaces";
import {
  createNewLocationRow,
  deleteLocationRowById,
  retrieveLocationList,
  patchLocationNameById,
  retrieveLocationRowById,
} from "../repository";

export const createNewLocation = async (
  createNewLocationPayload: ICreateLocation
) => {
  const result = await createNewLocationRow(createNewLocationPayload);
  return result;
};

export const getAllLocations = async () => {
  const result = await retrieveLocationList();
  return result;
};

export const getLocationRowById = async (location_id: number) => {
  const result = await retrieveLocationRowById(location_id);
  return result;
};

export const updateLocationNameById = async (
  location_id: number,
  name: string
) => {
  return await patchLocationNameById(location_id, name);
};

export const deleteLocationById = async (location_id: number) => {
  return await deleteLocationRowById(location_id);
};
