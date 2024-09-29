import { describe, vi, it, expect, beforeEach, afterEach } from "vitest";
import { locations } from "../../database/schema";
import { ICreateLocation } from "../../interfaces";
import {
  createNewLocationRow,
  deleteLocationRowById,
  patchLocationNameById,
  retrieveLocationList,
  retrieveLocationRowById,
} from "../locations.repository";
import db from "../../database/db";
import { CustomError } from "../../utils";
import { HTTP_CODES } from "../../constant";
import { eq } from "drizzle-orm";

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

describe("Locations Repository", () => {
  const mockResult = [
    {
      id: 1,
      name: "Testing",
      coordinate: [
        [-1, -1],
        [-5, -1],
        [-1, 2],
        [-5, 2],
      ],
    },
  ];
  describe("createNewLocationRow", () => {
    it("should create new location as expected", async () => {
      const mockQueryData: ICreateLocation = {
        name: "TestingLocation",
        coordinate: [
          [-1, -1],
          [-5, -1],
          [-1, 2],
          [-5, 2],
        ],
      };
      // vi.spyOn(db, "insert").mockRejectedValue({});

      await createNewLocationRow(mockQueryData);
      expect(db.insert).toHaveBeenCalledWith(locations);
      expect(db.insert(locations).values).toHaveBeenCalledWith(mockQueryData);
    });
    it("should throw error when failed to create new location", async () => {
      const mockQueryData: ICreateLocation = {
        name: "Testing",
        coordinate: [
          [-1, -1],
          [-5, -1],
          [-1, 2],
          [-5, 2],
        ],
      };
      vi.spyOn(db, "insert").mockRejectedValue({});

      // const newLocation = await createNewLocationRow(mockQueryData);
      await expect(createNewLocationRow(mockQueryData)).rejects.toThrow(
        new CustomError("Failed to create new location", HTTP_CODES.BAD_GATEWAY)
      );
      expect(db.insert).toHaveBeenCalledWith(locations);
    });
  });

  describe("retrieveLocationList", () => {
    it("should get all locations as expected", async () => {
      await retrieveLocationList();

      expect(db.select).toHaveBeenCalledWith();
      expect(db.select().from).toHaveBeenCalledWith(locations);
    });
    it("should throw error when failed to get location list", async () => {
      vi.spyOn(db, "select").mockRejectedValue({});
      await expect(retrieveLocationList()).rejects.toThrow(
        new CustomError("Failed to get location list", HTTP_CODES.BAD_GATEWAY)
      );
      expect(db.select).toHaveBeenCalledWith();
    });
  });

  // retrieveLocationRowById
  describe("retrieveLocationRowById", () => {
    // it("should get location by id as expected", async () => {
    //   const location_id = 1;
    //   await retrieveLocationRowById(location_id);

    //   expect(db.select).toHaveBeenCalledWith();
    //   expect(db.select().from).toHaveBeenCalledWith(locations);
    //   expect(db.select().from(locations).where).toHaveBeenCalledWith(
    //     eq(locations.id, location_id)
    //   );
    // });

    it("should throw error when failed to get location by id", async () => {
      const location_id = 1;
      vi.spyOn(db, "select").mockRejectedValue({});
      await expect(retrieveLocationRowById(location_id)).rejects.toThrow(
        new CustomError("Failed to get location by id", HTTP_CODES.BAD_GATEWAY)
      );
      expect(db.select).toHaveBeenCalledWith();
    });
  });

  describe("patchLocationNameById", () => {
    it("should update location name as expected", async () => {
      const location_id = 1;
      const name = "Testing_new_location";
      await patchLocationNameById(location_id, name);
      expect(db.update).toHaveBeenCalledWith(locations);
      expect(db.update(locations).set).toHaveBeenCalledWith({ name });
      expect(db.update(locations).set({ name }).where).toHaveBeenCalledWith(
        eq(locations.id, location_id)
      );
    });

    it("should throw error when failed to update location name", async () => {
      const location_id = 1;
      const name = "Testing_new_location";
      vi.spyOn(db, "update").mockRejectedValue({});
      await expect(patchLocationNameById(location_id, name)).rejects.toThrow(
        new CustomError(
          "Failed to update location name",
          HTTP_CODES.BAD_GATEWAY
        )
      );
    });
  });

  describe("deleteLocationRowById", () => {
    it("should delete location by id as expected", async () => {
      const location_id = 1;
      await deleteLocationRowById(location_id);
      expect(db.delete).toHaveBeenCalledWith(locations);
      expect(db.delete(locations).where).toHaveBeenCalledWith(
        eq(locations.id, location_id)
      );
    });
    it("should throw error when failed to delete location by id", async () => {
      const location_id = 1;
      vi.spyOn(db, "delete").mockRejectedValue({});
      await expect(deleteLocationRowById(location_id)).rejects.toThrow(
        new CustomError("Failed to delete location", HTTP_CODES.BAD_GATEWAY)
      );
    });
  });
});
