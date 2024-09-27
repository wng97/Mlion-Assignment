import { describe, it, expect } from "vitest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { callGetLocationApi } from "..";

const adapter = new MockAdapter(axios);

describe("Utils", () => {
  describe("callGetLocationApi", () => {
    it("should call axios get successfully", async () => {
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
      adapter
        .onGet("http://localhost:5001/locations/2")
        .reply(200, fakeLocationResult);
      const result = await callGetLocationApi(2);
      expect(result).toEqual(fakeLocationResult);
    });
  });
});
