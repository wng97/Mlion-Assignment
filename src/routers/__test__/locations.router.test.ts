import request from "supertest";
import { describe, it, vi, expect } from "vitest";
import express from "express";
import { locationsRouter } from "../locations.router"; // Adjust the path as needed
import * as locationsService from "../../services/locations.service";

// Set up an Express app with the router to test
const app = express();
app.use(express.json()); // Ensure JSON body parsing is enabled
app.use("/locations", locationsRouter);

describe("Locations Router", () => {
  it("should call createLocation when POST /locations/create is hit", async () => {
    const fakeRequest = {
      // body: {
      name: "Testing",
      coordinate: [
        [-1, -1],
        [-5, -1],
        [-1, 2],
        [-5, 2],
      ],
      // },
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

    const response = await request(app)
      .post("/locations/create")
      .send(fakeRequest); // Sample payload
    expect(createNewLocationMock).toHaveBeenCalledOnce();
    expect(response.status).toBe(201); // Expect status code 201 (Created)
    expect(response.body).toEqual(fakeResult); // Check response body
  });

  it("should call getLocations when GET /locations/list is hit", async () => {
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

    const response = await request(app).get("/locations/list");

    expect(getAllLocationsMock).toHaveBeenCalled();
    expect(response.status).toBe(200); // Expect status code 200 (OK)
    expect(response.body).toEqual(fakeResult); // Check response structure
  });

  it("should call getLocationById when GET /locations/:location_id is hit", async () => {
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
    const response = await request(app).get("/locations/1");

    expect(getLocationRowByIdMock).toHaveBeenCalledOnce(); // Ensure function was called
    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeResult); // Check response body
  });

  it("should call updateLocationName when PUT /locations/:location_id is hit", async () => {
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
    const response = await request(app)
      .put("/locations/1")
      .send({ name: "Updated Location" }); // Payload for update

    expect(updateLocationNameByIdMock).toHaveBeenCalledOnce();
    expect(response.status).toBe(200); // Expect status code 200 (OK)
    expect(response.body).toEqual(fakeResult); // Check response body
  });
});
