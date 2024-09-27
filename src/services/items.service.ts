import { ICreateItem, ILocation } from "../interfaces";
import {
  createNewItemRow,
  deleteItemRowById,
  patchItemLocation,
  retrieveItemById,
  retrieveItemList,
} from "../repository";
import {
  calculateLengthAndHeight,
  callGetLocationApi,
  CustomError,
} from "../utils";
import { HTTP_CODES } from "../constant";

export const createNewItem = async (
  location_id: number,
  createNewItemPayload: ICreateItem
) => {
  const { length, height } = createNewItemPayload;
  const selectedLocation: ILocation = await callGetLocationApi(location_id);
  const { containerLength, containerHeight } = calculateLengthAndHeight(
    selectedLocation.coordinate
  );
  if (length > containerLength || height > containerHeight) {
    throw new CustomError(
      "The item is too long or tall to fit inside the location",
      HTTP_CODES.REJECTED,
      `The item's ${
        length > containerLength ? "length" : "height"
      } cannot fit into the location.`
    );
  }

  const result = await createNewItemRow(location_id, createNewItemPayload);
  return result;
};

export const getAllItems = async () => {
  const result = await retrieveItemList();
  return result;
};

export const getItemRowById = async (item_id: number) => {
  const result = await retrieveItemById(item_id);
  return result;
};

export const updateItemLocation = async (
  item_id: number,
  location_id: number
) => {
  const selectedLocation: ILocation = await callGetLocationApi(location_id);
  const { containerLength, containerHeight } = calculateLengthAndHeight(
    selectedLocation.coordinate
  );

  const item = await retrieveItemById(item_id);
  if (item.length > containerLength || item.height > containerHeight) {
    throw new CustomError(
      "The item is too long or tall to fit inside the location",
      HTTP_CODES.REJECTED,
      `The item's ${
        item.length > containerLength ? "length" : "height"
      } cannot fit into the location.`
    );
  }

  const result = await patchItemLocation(item_id, location_id);
  return result;
};

export const deleteItemById = async (item_id: number) => {
  return await deleteItemRowById(item_id);
};
