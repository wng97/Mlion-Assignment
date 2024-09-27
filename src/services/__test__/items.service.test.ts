import { describe, expect, it, vi } from "vitest";
import * as itemsRepository from "../../repository/items.repository";
import * as utils from "../../utils";
import {
  createNewItem,
  deleteItemById,
  getAllItems,
  getItemRowById,
  updateItemLocation,
} from "../items.service";
import { CustomError } from "../../utils";
import { HTTP_CODES } from "../../constant";

describe("Items Service", () => {
  describe("createNewItem", () => {
    it("should create new item successfully", async () => {
      const fakePayload = {
        name: "Testing",
        type: "Testing",
        length: 3,
        width: 4,
        height: 3,
      };
      const fakeLocationResult = {
        id: 1,
        name: "Testing",
        coordinate: [
          [-1, 1],
          [5, 1],
          [5, 6],
          [-1, 6],
        ],
      };
      const fakeResult = {
        id: 1,
        name: "Testing",
        type: "Testing",
        location_id: 1,
        length: 3,
        width: 4,
        height: 3,
      };
      const callGetLocationApiMock = vi
        .spyOn(utils, "callGetLocationApi")
        .mockResolvedValue(fakeLocationResult);

      const createNewItemRowMock = vi
        .spyOn(itemsRepository, "createNewItemRow")
        .mockResolvedValue(fakeResult);
      const result = await createNewItem(1, fakePayload);
      expect(callGetLocationApiMock).toHaveBeenCalledOnce();
      expect(createNewItemRowMock).toHaveBeenCalledOnce();
      expect(result).toEqual(fakeResult);
    });

    it("should throw error when item's length is too long to fit inside the location", async () => {
      const fakePayload = {
        name: "Testing",
        type: "Testing",
        length: 10,
        width: 4,
        height: 3,
      };
      const fakeLocationResult = {
        id: 1,
        name: "Testing",
        coordinate: [
          [-1, 1],
          [5, 1],
          [5, 6],
          [-1, 6],
        ],
      };
      const callGetLocationApiMock = vi
        .spyOn(utils, "callGetLocationApi")
        .mockResolvedValue(fakeLocationResult);

      await expect(createNewItem(1, fakePayload)).rejects.toThrow(
        new CustomError(
          "The item is too long or tall to fit inside the location",
          HTTP_CODES.REJECTED,
          `The item's ${
            fakePayload.length > 6 ? "length" : "height"
          } cannot fit into the location.`
        )
      );
      expect(callGetLocationApiMock).toHaveBeenCalledOnce();
    });
    it("should throw error when item's height is too high to fit inside the location", async () => {
      const fakePayload = {
        name: "Testing",
        type: "Testing",
        length: 2,
        width: 4,
        height: 20,
      };
      const fakeLocationResult = {
        id: 1,
        name: "Testing",
        coordinate: [
          [-1, 1],
          [5, 1],
          [5, 6],
          [-1, 6],
        ],
      };
      const callGetLocationApiMock = vi
        .spyOn(utils, "callGetLocationApi")
        .mockResolvedValue(fakeLocationResult);

      await expect(createNewItem(1, fakePayload)).rejects.toThrow(
        new CustomError(
          "The item is too long or tall to fit inside the location",
          HTTP_CODES.REJECTED,
          `The item's ${
            fakePayload.length > 6 ? "length" : "height"
          } cannot fit into the location.`
        )
      );
      expect(callGetLocationApiMock).toHaveBeenCalledOnce();
    });
  });
  describe("getAllItems", () => {
    it("should get all items successfully", async () => {
      const fakeResult = [
        {
          id: 1,
          name: "Testing",
          type: "Testing",
          location_id: 1,
          length: 3,
          width: 4,
          height: 3,
        },
      ];
      const retrieveItemListMock = vi
        .spyOn(itemsRepository, "retrieveItemList")
        .mockResolvedValue(fakeResult);
      const result = await getAllItems();
      expect(retrieveItemListMock).toHaveBeenCalledOnce();
      expect(result).toEqual(fakeResult);
    });
  });
  describe("getItemRowById", () => {
    it("should get item by id successfully", async () => {
      const fakeId = 1;
      const fakeResult = {
        id: 1,
        name: "Testing",
        type: "Testing",
        location_id: 1,
        length: 3,
        width: 4,
        height: 3,
      };
      const retrieveItemRowByIdMock = vi
        .spyOn(itemsRepository, "retrieveItemById")
        .mockResolvedValue(fakeResult);
      const result = await getItemRowById(fakeId);
      expect(retrieveItemRowByIdMock).toHaveBeenCalledOnce();
      expect(result).toEqual(fakeResult);
    });
  });
  describe("updateItemLocation", () => {
    it("should update item location by id successfully", async () => {
      const fakeLocationResult = {
        id: 2,
        name: "Testing",
        coordinate: [
          [-1, 1],
          [5, 1],
          [5, 6],
          [-1, 6],
        ],
      };
      const callGetLocationApiMock = vi
        .spyOn(utils, "callGetLocationApi")
        .mockResolvedValue(fakeLocationResult);
      const retrieveItemByIdMock = vi
        .spyOn(itemsRepository, "retrieveItemById")
        .mockResolvedValue({
          id: 1,
          name: "Testing",
          type: "Testing",
          location_id: 1,
          length: 3,
          width: 4,
          height: 3,
        });
      const patchItemLocationMock = vi
        .spyOn(itemsRepository, "patchItemLocation")
        .mockResolvedValue({
          id: 1,
          name: "Testing",
          type: "Testing",
          location_id: 2,
          length: 3,
          width: 4,
          height: 3,
        });
      const fakeResult = {
        id: 1,
        name: "Testing",
        type: "Testing",
        location_id: 2,
        length: 3,
        width: 4,
        height: 3,
      };
      const result = await updateItemLocation(1, 2);
      expect(callGetLocationApiMock).toHaveBeenCalledOnce();
      expect(retrieveItemByIdMock).toHaveBeenCalledOnce();
      expect(patchItemLocationMock).toHaveBeenCalledOnce();
      expect(result).toEqual(fakeResult);
    });
    it("should throw error when item's length is long to fit inside the location", async () => {
      const fakeLocationResult = {
        id: 2,
        name: "Testing",
        coordinate: [
          [-1, 1],
          [5, 1],
          [5, 6],
          [-1, 6],
        ],
      };
      const callGetLocationApiMock = vi
        .spyOn(utils, "callGetLocationApi")
        .mockResolvedValue(fakeLocationResult);
      const retrieveItemByIdMock = vi
        .spyOn(itemsRepository, "retrieveItemById")
        .mockResolvedValue({
          id: 1,
          name: "Testing",
          type: "Testing",
          location_id: 1,
          length: 10,
          width: 4,
          height: 3,
        });

      await expect(updateItemLocation(1, 2)).rejects.toThrow(
        new CustomError(
          "The item is too long or tall to fit inside the location",
          HTTP_CODES.REJECTED,
          `The item's ${
            10 > 6 ? "length" : "height"
          } cannot fit into the location.`
        )
      );
      expect(callGetLocationApiMock).toHaveBeenCalledOnce();
      expect(retrieveItemByIdMock).toHaveBeenCalledOnce();
    });
    it("should throw error when item's height is high to fit inside the location", async () => {
      const fakeLocationResult = {
        id: 2,
        name: "Testing",
        coordinate: [
          [-1, 1],
          [5, 1],
          [5, 6],
          [-1, 6],
        ],
      };
      const callGetLocationApiMock = vi
        .spyOn(utils, "callGetLocationApi")
        .mockResolvedValue(fakeLocationResult);

      const retrieveItemByIdMock = vi
        .spyOn(itemsRepository, "retrieveItemById")
        .mockResolvedValue({
          id: 1,
          name: "Testing",
          type: "Testing",
          location_id: 1,
          length: 2,
          width: 4,
          height: 20,
        });

      await expect(updateItemLocation(1, 2)).rejects.toThrow(
        new CustomError(
          "The item is too long or tall to fit inside the location",
          HTTP_CODES.REJECTED,
          `The item's ${
            10 > 6 ? "length" : "height"
          } cannot fit into the location.`
        )
      );
      expect(callGetLocationApiMock).toHaveBeenCalledOnce();
      expect(retrieveItemByIdMock).toHaveBeenCalledOnce();
    });
  });
  describe("deleteItem", () => {
    it("should delete item by id successfully", async () => {
      const fakeId = 1;
      const deleteItemByIdMock = vi
        .spyOn(itemsRepository, "deleteItemRowById")
        .mockResolvedValue();
      await deleteItemById(fakeId);
      expect(deleteItemByIdMock).toHaveBeenCalledOnce();
    });
  });
});
