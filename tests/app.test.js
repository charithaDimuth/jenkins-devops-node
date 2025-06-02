const request = require("supertest");
const app = require("../src/index");

describe("GET /api/ping", () => {
  it("should return pong", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "pong");
  });
});