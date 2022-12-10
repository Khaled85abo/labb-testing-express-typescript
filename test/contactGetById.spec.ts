import makeApp from "../app";
import request from "supertest";
import nock from "nock";
const getContactById = jest.fn();
const app = makeApp({ getContactById });

describe("GET /contact/:id", () => {
  beforeAll(() => {
    nock("https://api.api-ninjas.com")
      .get("/v1/geocoding?city=Stockholm&country=Sweden")
      .times(1)
      .reply(200, [
        {
          name: "Stockholm",
          latitude: 59.3251172,
          longitude: 18.0710935,
          country: "SE",
        },
      ]);
  });
  beforeEach(() => {
    getContactById.mockReset();
    getContactById.mockResolvedValue({
      firstname: "Per",
      lastname: "persson",
      email: "per.per@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
      _id: "63939b297bcfa687568eaa3d",
      __v: 0,
    });
  });

  it("should return 400 if invalid mongo id is provided", async () => {
    const response = await request(app).get("/api/contact/hejhej");
    expect(response.statusCode).toBe(400);
  });

  it("should return a correct latitud if valid id is provided", async () => {
    const response = await request(app).get(
      "/api/contact/63939b297bcfa687568eaa3d"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.latitude).toBe(59.3251172);
    expect(response.body).toStrictEqual({
      firstname: "Per",
      lastname: "persson",
      email: "per.per@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
      _id: "63939b297bcfa687568eaa3d",
      latitude: 59.3251172,
      longitude: 18.0710935,
    });
  });
});

describe("GET/Contact/:id", () => {
  beforeEach(() => {
    getContactById.mockReset();
    getContactById.mockResolvedValue(null);
  });
  it("should return a 404 if contact id doesn't exist", async () => {
    const response = await request(app).get(
      "/api/contact/63939b297bcfa687568eaa30"
    );
    expect(response.statusCode).toBe(404);
  });
});
