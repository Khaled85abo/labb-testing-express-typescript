import request from "supertest";
import makeApp from "./app";

const app = makeApp({});
describe("Check app health check endpint", () => {
  test("Should return your api is health and runnig when calling health check endpoint", async () => {
    const response = await request(app).get("/api/healthcheck");
    // expect(response.statusCode).toBe(200);
    expect(response.status).toBe(200);
    expect(response.headers["content-length"]).toBe("41");
  });
});
