import request from "supertest";
import { describe, it, vi, expect } from "vitest";
import express from "express";
import { itemsRouter } from "../items.router"; // Adjust the path as needed
// import * as itemsController from "../../controllers/items.controller";
import * as itemsService from "../../services/items.service";

// Set up an Express app with the router to test
const app = express();
app.use(express.json()); // Ensure JSON body parsing is enabled
app.use("/items", itemsRouter);

describe("Items Router", () => {
  it("should call createItem when POST /items/create is hit", async () => {
    const fakeRequest = {
      name: "Testing",
      type: "Testing",
      length: 3,
      width: 4,
      height: 3,
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

    const response = await request(app)
      .post("/items/create/1")
      .send(fakeRequest); // Sample payload
    expect(createNewItemMock).toHaveBeenCalledOnce();
    expect(response.status).toBe(201); // Expect status code 201 (Created)
    expect(response.body).toEqual(fakeResult); // Check response body
  });

  it("should call getItems when GET /items/list is hit", async () => {
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

    const response = await request(app).get("/items/list");
    expect(getAllItemsMock).toHaveBeenCalledOnce();
    expect(response.status).toBe(200); // Expect status code 200 (OK)
    expect(response.body).toEqual(fakeResult); // Check response body
  });

  it("should call getItemById when GET /items/:item_id is hit", async () => {
    const fakeResult = {
      id: 1,
      name: "Testing",
      type: "Testing",
      location_id: 1,
      length: 3,
      width: 4,
      height: 3,
    };
    const getItemRowByIdMock = vi
      .spyOn(itemsService, "getItemRowById")
      .mockResolvedValue(fakeResult);

    const response = await request(app).get("/items/1");
    expect(getItemRowByIdMock).toHaveBeenCalledOnce();
    expect(response.status).toBe(200); // Expect status code 200 (OK)
    expect(response.body).toEqual(fakeResult); // Check response body
  });

  it("should call changeItemLocation when PUT /items/:item_id/location/:location_id is hit", async () => {
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

    const response = await request(app).put("/items/1/location/2");
    expect(changeItemLocationMock).toHaveBeenCalledOnce();
    expect(response.status).toBe(200); // Expect status code 200 (OK)
    expect(response.body).toEqual(fakeResult); // Check response body
  });

  it("should call deleteItem when DELETE /items/:item_id is hit", async () => {
    const deleteItemByIdMock = vi
      .spyOn(itemsService, "deleteItemById")
      .mockResolvedValue();

    const response = await request(app).delete("/items/1");
    expect(deleteItemByIdMock).toHaveBeenCalledOnce();
    expect(response.status).toBe(200); // Expect status code 200 (OK)
  });
});
