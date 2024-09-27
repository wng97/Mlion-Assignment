import { describe, expect, it, vi } from "vitest";
import * as locationRepository from "../../repository/locations.repository";
import {
  createNewLocation,
  deleteLocationById,
  getAllLocations,
  getLocationRowById,
  updateLocationNameById,
} from "../locations.service";

describe("Locations Services", () => {
  describe("createNewLocation", () => {
    it("should create new location successfully", async () => {
      const fakePayload = {
        name: "Testing",
        coordinate: [
          [-1, -1],
          [-5, -1],
          [-1, 2],
          [-5, 2],
        ],
      };
      const fakeResult = {
        id: 1,
        name: "Testing",
        coordinate: [
          [-1, -1],
          [-5, -1],
          [-1, 2],
          [-5, 2],
        ],
      };
      const createNewLocationRowMock = vi
        .spyOn(locationRepository, "createNewLocationRow")
        .mockResolvedValue(fakeResult);
      const result = await createNewLocation(fakePayload);
      expect(createNewLocationRowMock).toHaveBeenCalledOnce();
      expect(result).toEqual(fakeResult);
    });
  });
  describe("getAllLocations", () => {
    it("should get all locations successfully", async () => {
      const fakeResult = [
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
      const retrieveLocationListMock = vi
        .spyOn(locationRepository, "retrieveLocationList")
        .mockResolvedValue(fakeResult);
      const result = await getAllLocations();
      expect(retrieveLocationListMock).toHaveBeenCalledOnce();
      expect(result).toEqual(fakeResult);
    });
  });
  describe("getLocationRowById", () => {
    it("should get location by id successfully", async () => {
      const fakeResult = {
        id: 1,
        name: "Testing",
        coordinate: [
          [-1, -1],
          [-5, -1],
          [-1, 2],
          [-5, 2],
        ],
      };
      const retrieveLocationRowByIdMock = vi
        .spyOn(locationRepository, "retrieveLocationRowById")
        .mockResolvedValue(fakeResult);
      const result = await getLocationRowById(1);
      expect(retrieveLocationRowByIdMock).toHaveBeenCalledOnce();
      expect(result).toEqual(fakeResult);
    });
  });
  describe("updateLocationNameById", () => {
    it("should update location name by id successfully", async () => {
      const fakeResult = {
        id: 1,
        name: "Testing",
        coordinate: [
          [-1, -1],
          [-5, -1],
          [-1, 2],
          [-5, 2],
        ],
      };
      const patchLocationNameByIdMock = vi
        .spyOn(locationRepository, "patchLocationNameById")
        .mockResolvedValue(fakeResult);
      const result = await updateLocationNameById(1, "Testing");
      expect(patchLocationNameByIdMock).toHaveBeenCalledOnce();
      expect(result).toEqual(fakeResult);
    });
  });

  describe("deleteLocationById", () => {
    it("should delete location by id successfully", async () => {
      const deleteLocationRowByIdMock = vi
        .spyOn(locationRepository, "deleteLocationRowById")
        .mockResolvedValue();
      await deleteLocationById(1);
      expect(deleteLocationRowByIdMock).toHaveBeenCalledOnce();
    });
  });
});
