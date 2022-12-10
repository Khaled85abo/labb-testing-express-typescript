import makeApp from "../app";
import request from "supertest";
const getAllContacts = jest.fn();
const app = makeApp({ getAllContacts });
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
