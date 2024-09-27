import { describe, expect, it, vi } from "vitest";
import * as itemsService from "../../services/items.service";
import {
  changeItemLocation,
  createItem,
  deleteItem,
  getItemById,
  getItems,
} from "../items.controller";
import { Request, Response } from "express";
import { HTTP_CODES } from "../../constant";

describe("Locations Controller", () => {
  const res = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;
  describe("createItem", () => {
    it("should create item successfully", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
        body: {
          name: "Testing",
          type: "Testing",
          length: 3,
          width: 4,
          height: 3,
        },
      } as unknown as Request;
      const fakeResult = {
        id: 1,
        name: "Testing",
        type: "Testing",
        location_id: 1,
        length: 3,
        width: 4,
        height: 3,
      };
      const createNewItemMock = vi
        .spyOn(itemsService, "createNewItem")
        .mockResolvedValue(fakeResult);
      await createItem(fakeRequest, res);
      expect(createNewItemMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.CREATED);
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
    it("should return error if createNewItem return error", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
        body: {
          name: "Testing",
          type: "Testing",
          length: 3,
          width: 4,
          height: 3,
        },
      } as unknown as Request;
      const fakeError = new Error("Error creating item");
      const createNewItemMock = vi
        .spyOn(itemsService, "createNewItem")
        .mockRejectedValue(fakeError);
      await createItem(fakeRequest, res);
      expect(createNewItemMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error creating items",
        errors: fakeError,
      });
    });
    it("should return error if one of the request params or body is not fulfilled", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
        body: {
          name: "Testing",
          type: "Testing",
          length: 3,
          width: 4,
        },
      } as unknown as Request;
      await createItem(fakeRequest, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe("getItems", () => {
    it("should get item list successfully", async () => {
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
      const getAllItemsMock = vi
        .spyOn(itemsService, "getAllItems")
        .mockResolvedValue(fakeResult);
      await getItems({} as Request, res);
      expect(getAllItemsMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
    it("should return error if getAllItems return error", async () => {
      const fakeError = new Error("Error retriving items");
      const getAllItemsMock = vi
        .spyOn(itemsService, "getAllItems")
        .mockRejectedValue(fakeError);
      await getItems({} as Request, res);
      expect(getAllItemsMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retriving items",
        errors: fakeError,
      });
    });
  });

  describe("getItemById", () => {
    it("should get item by id successfully", async () => {
      const fakeRequest = {
        params: {
          item_id: "1",
        },
      } as unknown as Request;

      const fakeResult = {
        id: 1,
        name: "Testing",
        type: "Testing",
        location_id: 1,
        length: 3,
        width: 4,
        height: 3,
      };
      const getItemByIdMock = vi
        .spyOn(itemsService, "getItemRowById")
        .mockResolvedValue(fakeResult);
      await getItemById(fakeRequest, res);
      expect(getItemByIdMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
    it("should return error if getItemRowById return error", async () => {
      const fakeRequest = {
        params: {
          item_id: "1",
        },
      } as unknown as Request;
      const fakeError = new Error("Error retriving item");
      const getItemByIdMock = vi
        .spyOn(itemsService, "getItemRowById")
        .mockRejectedValue(fakeError);
      await getItemById(fakeRequest, res);
      expect(getItemByIdMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retriving item",
        errors: fakeError,
      });
    });
    it("should return error if one of the request params or body is not fulfilled", async () => {
      const fakeRequest = {
        params: {
          item_id: 1,
        },
      } as unknown as Request;
      await getItemById(fakeRequest, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe("changeItemLocation", () => {
    it("should change item location successfully", async () => {
      const fakeRequest = {
        params: {
          item_id: "1",
          location_id: "2",
        },
      } as unknown as Request;
      const fakeResult = {
        id: 1,
        name: "Testing",
        type: "Testing",
        location_id: 2,
        length: 3,
        width: 4,
        height: 3,
      };
      const changeItemLocationMock = vi
        .spyOn(itemsService, "updateItemLocation")
        .mockResolvedValue(fakeResult);
      await changeItemLocation(fakeRequest, res);
      expect(changeItemLocationMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
    it("should return error if updateItemLocation return error", async () => {
      const fakeRequest = {
        params: {
          item_id: "1",
          location_id: "2",
        },
      } as unknown as Request;
      const fakeError = new Error("Error changing item's location");
      const changeItemLocationMock = vi
        .spyOn(itemsService, "updateItemLocation")
        .mockRejectedValue(fakeError);
      await changeItemLocation(fakeRequest, res);
      expect(changeItemLocationMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error changing item's location",
        errors: fakeError,
      });
    });
    it("should return error if one of the request params or body is not fulfilled", async () => {
      const fakeRequest = {
        params: {
          item_id: 1,
        },
        body: {
          location_id: "2",
        },
      } as unknown as Request;
      await changeItemLocation(fakeRequest, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe("deleteItem", () => {
    it("should delete item by id successfully", async () => {
      const fakeRequest = {
        params: {
          item_id: "1",
        },
      } as unknown as Request;
      const deleteItemMock = vi
        .spyOn(itemsService, "deleteItemById")
        .mockResolvedValue();
      await deleteItem(fakeRequest, res);
      expect(deleteItemMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
      expect(res.json).toHaveBeenCalledWith("Item deleted");
    });
    it("should return error if deleteItemById return error", async () => {
      const fakeRequest = {
        params: {
          item_id: "1",
        },
      } as unknown as Request;
      const fakeError = new Error("Error deleting item");
      const deleteItemMock = vi
        .spyOn(itemsService, "deleteItemById")
        .mockRejectedValue(fakeError);
      await deleteItem(fakeRequest, res);
      expect(deleteItemMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error deleting item",
        errors: fakeError,
      });
    });
    it("should return error if one of the request params or body is not fulfilled", async () => {
      const fakeRequest = {
        params: {
          item_id: 1,
        },
      } as unknown as Request;
      await deleteItem(fakeRequest, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    });
  });
});
