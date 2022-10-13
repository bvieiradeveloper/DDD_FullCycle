import { createApp } from "../express";
import request from "supertest";
import { setudpDb } from "../database";
import { Sequelize } from "sequelize";

describe("E2E test for customer", () => {

  let sequelize: Sequelize
  let app = createApp()

  beforeEach(async () => {
    sequelize = await setudpDb()
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/test")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
    
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "john",
    });
    expect(response.status).toBe(404);
  });

});