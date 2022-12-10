import { default as request } from "supertest";
import makeApp from "./app";
import nock from "nock";
import {
  validateEmail,
  validatePersonalNumber,
  validateZipCode,
} from "./validation";

const createContact = jest.fn();
const getContactById = jest.fn();
const getAllContacts = jest.fn();
const app = makeApp({ createContact, getContactById, getAllContacts });
const validContactData = {
  firstname: "Per",
  lastname: "persson",
  email: "per.per@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
};
const invalidContactData = {
  firstname: "",
  lastname: "persson",
  email: "per.per@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
};

describe("Validate email", () => {
  it("should return false if input is invalid", () => {
    expect(validateEmail("jonatan@gmail.com")).toBe(true);
  });
  it("should return false if the input is invalid", () => {
    expect(validateEmail("jonatan@gmail")).toBe(false);
  });
  it("should return false if the input is invalid", () => {
    expect(validateEmail("jonatan.com")).toBe(false);
  });
});

describe("Validate zipCode", () => {
  it("should return true if input is 111 22", () => {
    expect(validateZipCode("111 22")).toBe(true);
  });
  it("should return true if input is 12345", () => {
    expect(validateZipCode("12345")).toBe(true);
  });
  it("should return false if the input is 1234", () => {
    expect(validateZipCode("1234")).toBe(false);
  });
  it("should return false if the input is 123456", () => {
    expect(validateZipCode("123456")).toBe(false);
  });
  it("should return false if the input is abcde", () => {
    expect(validateZipCode("abcde")).toBe(false);
  });
});

describe("Validate personal number", () => {
  it("Should return true if personal number 550713-1405", () => {
    expect(validatePersonalNumber("550713-1405")).toBe(true);
  });
  it("Should return true if personal number 5507131405", () => {
    expect(validatePersonalNumber("5507131405")).toBe(true);
  });
  it("Should return false if personal number 55071314055", () => {
    expect(validatePersonalNumber("55071314055")).toBe(false);
  });
  it("Should return false if personal number 55071a1405", () => {
    expect(validatePersonalNumber("55071a1405")).toBe(false);
  });
});
describe("POST /contact", () => {
  beforeEach(() => {
    createContact.mockReset();
    createContact.mockResolvedValue({
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
  it("should return 201 status code when posting product with valid data", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send(validContactData);
    expect(response.statusCode).toBe(201);
  });

  it("should return content-type = json", async () => {
    const response = await request(app).post("/api/contact");
    expect(response.headers["content-type"].indexOf("json") > -1).toBeTruthy();
  });

  it("should return 400 status code if sending invalid post data", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send(invalidContactData);
    expect(response.statusCode).toBe(400);
  });

  it("should call createContact 1 time", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send(validContactData);
    expect(createContact.mock.calls.length).toBe(1);
  });

  it("should recive a Per when posting", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send(validContactData);
    expect(response.body.firstname).toBe("Per");
  });
});

describe("Get /Contact", () => {
  beforeEach(() => {
    getAllContacts.mockReset();
    getAllContacts.mockResolvedValue([
      {
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
      },
    ]);
  });
  it("Should return 200 status code and a list of conatcts", async () => {
    const response = await request(app).get("/api/contact");
    expect(response.statusCode).toBe(200);
  });
});

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
