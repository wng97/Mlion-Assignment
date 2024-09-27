import { describe, expect, it, vi } from "vitest";
import * as locationsService from "../../services/locations.service";
import { HTTP_CODES } from "../../constant";
import {
  createLocation,
  deleteLocation,
  getLocationById,
  getLocations,
  updateLocationName,
} from "../locations.controller";
import { Request, Response } from "express";

describe("Locations Controller", () => {
  const res = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;

  describe("createLocation", () => {
    it("should get all locations successfully", async () => {
      const fakeRequest = {
        body: {
          name: "Testing",
          coordinate: [
            [-1, -1],
            [-5, -1],
            [-1, 2],
            [-5, 2],
          ],
        },
      } as unknown as Request;

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

      const createNewLocationMock = vi
        .spyOn(locationsService, "createNewLocation")
        .mockResolvedValue(fakeResult);
      await createLocation(fakeRequest, res);
      expect(createNewLocationMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.CREATED);
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
    it("should return error if createNewLocation return error", async () => {
      const fakeRequest = {
        body: {
          name: "Testing",
          coordinate: [
            [-1, -1],
            [-5, -1],
            [-1, 2],
            [-5, 2],
          ],
        },
      } as unknown as Request;
      const createNewLocationMock = vi
        .spyOn(locationsService, "createNewLocation")
        .mockRejectedValue("error");
      await createLocation(fakeRequest, res);
      expect(createNewLocationMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
    });
    it("should return error if one of the request body param is not fulfilled", async () => {
      const fakeRequest = {
        body: {
          name: "Testing",
          coordinate: [],
        },
      } as unknown as Request;
      await createLocation(fakeRequest, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe("getLocations", () => {
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
      const getAllLocationsMock = vi
        .spyOn(locationsService, "getAllLocations")
        .mockResolvedValue(fakeResult);
      await getLocations({} as Request, res);
      expect(getAllLocationsMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
    it("should return error if getAllLocations return error", async () => {
      const getAllLocationsMock = vi
        .spyOn(locationsService, "getAllLocations")
        .mockRejectedValue("error");
      await getLocations({} as Request, res);
      expect(getAllLocationsMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
    });
  });

  describe("getLocationById", () => {
    // test cases for getLocationById
    it("should get location by id successfully", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
      } as unknown as Request;

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
      const getLocationRowByIdMock = vi
        .spyOn(locationsService, "getLocationRowById")
        .mockResolvedValue(fakeResult);
      await getLocationById(fakeRequest, res);
      expect(getLocationRowByIdMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.CREATED);
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
    it("should return error if getLocationRowById return error", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
      } as unknown as Request;
      const getLocationRowByIdMock = vi
        .spyOn(locationsService, "getLocationRowById")
        .mockRejectedValue("error");
      await getLocationById(fakeRequest, res);
      expect(getLocationRowByIdMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
    });
    it("should return error if one of the request params is not fulfilled", async () => {
      const fakeRequest = {
        params: {
          location_id: 1,
        },
      } as unknown as Request;
      await getLocationById(fakeRequest, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe("updateLocationName", () => {
    // test cases for updateLocationName
    it("should update location name by id successfully", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
        body: {
          name: "Testing1",
        },
      } as unknown as Request;

      const fakeResult = {
        id: 1,
        name: "Testing1",
        coordinate: [
          [-1, -1],
          [-5, -1],
          [-1, 2],
          [-5, 2],
        ],
      };
      const updateLocationNameByIdMock = vi
        .spyOn(locationsService, "updateLocationNameById")
        .mockResolvedValue(fakeResult);
      await updateLocationName(fakeRequest, res);
      expect(updateLocationNameByIdMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
      expect(res.json).toHaveBeenCalledWith(fakeResult);
    });
    it("should return error if updateLocationNameById return error", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
        body: {
          name: "Testing1",
        },
      } as unknown as Request;
      const updateLocationNameByIdMock = vi
        .spyOn(locationsService, "updateLocationNameById")
        .mockRejectedValue("error");
      await updateLocationName(fakeRequest, res);
      expect(updateLocationNameByIdMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
    });
    it("should return error if one of the request params is not fulfilled", async () => {
      const fakeRequest = {
        params: {
          location_id: 1,
        },
        body: {
          name: "Testing1",
        },
      } as unknown as Request;
      await updateLocationName(fakeRequest, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe("deleteLocation", () => {
    it("should delete location by id successfully", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
      } as unknown as Request;

      const deleteLocationByIdMock = vi
        .spyOn(locationsService, "deleteLocationById")
        .mockResolvedValue();
      await deleteLocation(fakeRequest, res);
      expect(deleteLocationByIdMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
      expect(res.json).toHaveBeenCalledWith("Location deleted");
    });
    it("should return error if deleteLocationById return error", async () => {
      const fakeRequest = {
        params: {
          location_id: "1",
        },
      } as unknown as Request;
      const deleteLocationByIdMock = vi
        .spyOn(locationsService, "deleteLocationById")
        .mockRejectedValue("error");
      await deleteLocation(fakeRequest, res);
      expect(deleteLocationByIdMock).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
    });
    it("should return error if one of the request params is not fulfilled", async () => {
      const fakeRequest = {
        params: {
          location_id: 1,
        },
      } as unknown as Request;
      await deleteLocation(fakeRequest, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    });
  });
});
