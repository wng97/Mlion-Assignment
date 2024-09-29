import { expect, vi, describe, it } from "vitest";
import {
  createNewItemRow,
  deleteItemRowById,
  patchItemLocation,
  retrieveItemById,
  retrieveItemList,
} from "../items.repository";
import db from "../../database/db";
import { items } from "../../database/schema";
import { ICreateItem } from "../../interfaces";
import { CustomError } from "../../utils";
import { HTTP_CODES } from "../../constant";
import { desc, eq } from "drizzle-orm";

// Mock db module
vi.mock("../../database/db", async (importOriginal) => {
  const original = await importOriginal<typeof import("../../database/db")>();

  return {
    ...original,
    default: {
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
    },
  };
});

describe("Items Repository", () => {
  describe("createNewItemRow", () => {
    it("should create new item as expected", async () => {
      const mockQueryData: ICreateItem = {
        name: "TestingItem",
        type: "TestingType",
        length: 1,
        width: 1,
        height: 1,
      };
      await createNewItemRow(1, mockQueryData);
      expect(db.insert).toHaveBeenCalledWith(items);
      expect(db.insert(items).values).toHaveBeenCalledWith({
        ...mockQueryData,
        location_id: 1,
      });
    });
    it("should throw error when failed to create new item", async () => {
      const mockQueryData: ICreateItem = {
        name: "Testing",
        type: "Testing",
        length: 1,
        width: 1,
        height: 1,
      };
      vi.spyOn(db, "insert").mockRejectedValue({});

      await expect(createNewItemRow(1, mockQueryData)).rejects.toThrow(
        new CustomError("Failed to create new location", HTTP_CODES.BAD_GATEWAY)
      );
    });
  });
  describe("retrieveItemList", () => {
    it("should retrieve item list as expected", async () => {
      const mockResult = [
        {
          id: 1,
          name: "Testing",
          type: "Testing",
          length: 1,
          width: 1,
          height: 1,
        },
      ];
      await retrieveItemList();
      expect(db.select).toHaveBeenCalledWith();
      expect(db.select().from).toHaveBeenCalledWith(items);
      // expect(result).toEqual(mockResult);
    });
    it("should throw error when failed to retrieve item list", async () => {
      vi.spyOn(db, "select").mockRejectedValue({});
      await expect(retrieveItemList()).rejects.toThrow(
        new CustomError("Failed to retrieve item list", HTTP_CODES.BAD_GATEWAY)
      );
    });
  });
  describe("retrieveItemById", () => {
    // it("should retrieve item by id as expected", async () => {
    //   vi.spyOn(db, "select").mockResolvedValue({
    //     from: vi.fn().mockReturnThis()
    //   });
    //   await retrieveItemById(1);
    //   expect(db.select).toHaveBeenCalledWith();
    //   expect(db.select().from).toHaveBeenCalledWith(items);
    //   // expect(db.select().from(items).where).toHaveBeenCalledWith(
    //   //   eq(items.id, 1)
    //   // );
    //   // expect(result).toEqual(mockResult);
    // });
    it("should throw error when failed to retrieve item by id", async () => {
      vi.spyOn(db, "select").mockRejectedValue({});
      await expect(retrieveItemById(1)).rejects.toThrow(
        new CustomError("Failed to get item by id", HTTP_CODES.BAD_GATEWAY)
      );
    });
  });

  describe("patchItemLocation", () => {
    it("should update item location as expected", async () => {
      const item_id = 1;
      const location_id = 1;
      await patchItemLocation(item_id, location_id);
      expect(db.update).toHaveBeenCalledWith(items);
      expect(db.update(items).set).toHaveBeenCalledWith({ location_id });
      expect(db.update(items).set({ location_id }).where).toHaveBeenCalledWith(
        eq(items.id, item_id)
      );
    });
    it("should throw error when failed to update item location", async () => {
      const item_id = 1;
      const location_id = 1;
      vi.spyOn(db, "update").mockRejectedValue({});
      await expect(patchItemLocation(item_id, location_id)).rejects.toThrow(
        new CustomError(
          "Failed to update item location",
          HTTP_CODES.BAD_GATEWAY
        )
      );
    });
  });

  describe("deleteItemRowById", () => {
    it("should delete item by id as expected", async () => {
      const item_id = 1;
      await deleteItemRowById(item_id);
      expect(db.delete).toHaveBeenCalledWith(items);
      expect(db.delete(items).where).toHaveBeenCalledWith(
        eq(items.id, item_id)
      );
    });
    it("should throw error when failed to delete item by id", async () => {
      vi.spyOn(db, "delete").mockRejectedValue({});
      await expect(deleteItemRowById(1)).rejects.toThrow(
        new CustomError("Failed to delete item by id", HTTP_CODES.BAD_GATEWAY)
      );
    });
  });
});
