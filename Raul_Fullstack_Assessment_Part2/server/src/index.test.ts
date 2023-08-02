import request from "supertest";
import app from "./index";

describe("GET /awesome/applicant/:id", () => {
  it("should return information about the applicant", async () => {
    const createResponse = await request(app)
      .post("/awesome/applicant")
      .send({ name: "John Smith", age: 30 });
    const { id } = createResponse.body;
    const response = await request(app).get(`/awesome/applicant/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("age");
  });

  it("should return null body when the applicant does not exist", async () => {
    const response = await request(app).get("/awesome/applicant/999999");
    expect(response.body).toBe(null);
  });
});

describe("POST /awesome/applicant", () => {
  it("should create a new applicant", async () => {
    const response = await request(app)
      .post("/awesome/applicant")
      .send({ name: "John Doe", age: 25 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "John Doe");
    expect(response.body).toHaveProperty("age", 25);
  });
});

describe("PUT /awesome/applicant/:id", () => {
  it("should update an existing applicant", async () => {
    const createResponse = await request(app)
      .post("/awesome/applicant")
      .send({ name: "Jane Smith", age: 30 });
    const { id } = createResponse.body;

    const updateResponse = await request(app)
      .put(`/awesome/applicant/${id}`)
      .send({ name: "Jane Doe", age: 35 });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty("id", id);
    expect(updateResponse.body).toHaveProperty("name", "Jane Doe");
    expect(updateResponse.body).toHaveProperty("age", 35);
  });

  it("should return 404 if applicant is not found", async () => {
    const response = await request(app)
      .put("/awesome/applicant/999")
      .send({ name: "John Doe", age: 25 });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Person not found");
  });
});

describe("DELETE /awesome/applicant/:id", () => {
  it("should delete an existing applicant", async () => {
    const createResponse = await request(app)
      .post("/awesome/applicant")
      .send({ name: "Jane Smith", age: 30 });
    const { id } = createResponse.body;

    const deleteResponse = await request(app).delete(
      `/awesome/applicant/${id}`
    );

    expect(deleteResponse.status).toBe(204);
    expect(deleteResponse.body).toEqual({});
  });

  it("should return 404 if applicant is not found", async () => {
    const response = await request(app).delete("/awesome/applicant/999");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Person not found");
  });
});
