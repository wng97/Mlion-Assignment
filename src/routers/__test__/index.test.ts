import request from "supertest";
import express from "express";
import { describe, it, expect, vi } from "vitest";
import routers from "../index"; // Import the main combined router
import { locationsRouter } from "../locations.router";
import { itemsRouter } from "../items.router";

// Mock the individual routers
vi.mock("../locations.router", () => ({
  locationsRouter: vi.fn((req, res) =>
    res.status(200).send("Locations Router")
  ),
}));

vi.mock("../items.router", () => ({
  itemsRouter: vi.fn((req, res) => res.status(200).send("Items Router")),
}));

// Set up the Express app with the combined routers
const app = express();
app.use(routers);

describe("Main Routers", () => {
  it("should use the locationsRouter for /locations", async () => {
    // Simulate a request to /locations
    const response = await request(app).get("/locations");

    // Assert that the request was routed to the locations router
    expect(response.status).toBe(200);
    expect(response.text).toBe("Locations Router");
  });

  it("should use the itemsRouter for /items", async () => {
    // Simulate a request to /items
    const response = await request(app).get("/items");

    // Assert that the request was routed to the items router
    expect(response.status).toBe(200);
    expect(response.text).toBe("Items Router");
  });

  it("should return 404 for unknown routes", async () => {
    // Simulate a request to a non-existing route
    const response = await request(app).get("/unknown");

    // Assert that the request returns 404 for unknown routes
    expect(response.status).toBe(404);
  });
});
