import request from "supertest";
import makeApp from "../app";
const createContact = jest.fn();
const app = makeApp({ createContact });
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
