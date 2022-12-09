import request from "supertest";
import makeApp from "./app";
import nock from "nock";

const validUser = {
  firstname: "Anna",
  lastname: "Andersson",
  email: "anna.andersson@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
};
const invalidUser = {
  firstname: "",
  lastname: "Andersson",
  email: "anna.andersson@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
};
const user = {
  id: "638cfd06f84b41a7be61ebad",
  firstname: "Anna",
  lastname: "Andersson",
  email: "anna.andersson@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
  lat: 59.3251172,
  lng: 18.0710935,
};
const createContact = jest.fn();
const getAllContacts = jest.fn();
const getContactById = jest.fn();

const app = makeApp({});

nock("https://api.api-ninjas.com")
  .get("/v1/geocoding?city=Huddinge&country=sweden")
  .reply(200, [
    {
      name: "Huddinge",
      latitude: 59.2293827,
      longitude: 17.9748815,
      country: "SE",
    },
    {
      name: "Huddinge kommun",
      latitude: 59.216667,
      longitude: 18,
      country: "SE",
    },
  ]);

describe("Check app health check endpint", () => {
  test("Should return your api is health and runnig when calling health check endpoint", async () => {
    const response = await request(app).get("/api/healthcheck");
    // expect(response.statusCode).toBe(200);
    // expect(response.headers["content-length"]).toBe("41");
    expect(response.status).toBe(200);
  });
});

describe("POST /contact", () => {
  it("Should return 200 status code when posting a valid contact", async () => {
    const response = await request(app).post("/api/contact").send(validUser);
    expect(response.status).toBe(201);
  });

  it("Should return 400 status code if post data is invalid", async () => {
    const response = await request(app).post("/api/contact").send(invalidUser);
    expect(response.statusCode).toBe(400);
  });
});

describe("GET /contact", () => {
  it("Should return 200 status code and a list of contacts", async () => {
    const response = await request(app).get("/api/contact");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /contact/:id", () => {
  it("Should return 200 status code and a user if user exist", async () => {
    const response = await request(app).get(
      "/api/contact/638cfd06f84b41a7be61ebad"
    );
    expect(response.statusCode).toBe(200);
  });
  it("Should return a 404 status code if user not found", async () => {
    const response = await request(app).get(
      "/api/contact/638cfd06f84b41a7be61ebac"
    );
    expect(response.statusCode).toBe(404);
  });
  it("Should return 400 status code if id is invalid", async () => {
    const response = await request(app).get("/api/contact/hej");
    expect(response.statusCode).toBe(400);
  });
});
