import request from "supertest";
import { app } from "../../app";
import { AppDataSource } from "../../config/ormconfig";

describe("User Routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  it("should return all users", async () => {
    const response = await request(app).get("/users/all");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it("should return a user by ID", async () => {
    const response = await request(app).get("/users/9a9fae07-4dc2-4ba6-b7ed-072c5379850b");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it("should return 404 for a user that does not exist", async () => {
    const response = await request(app).get("/users/9a9fae07-4dc2-4ba6-b7ed-072c5375850b");
    expect(response.status).toBe(404);
  });

  it("should return a user by username", async () => {
    const response = await request(app).get("/users/username/user1");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it("should return 404 for a username that does not exist", async () => {
    const response = await request(app).get("/users/username/user100");
    expect(response.status).toBe(404);
  });

  it("should return a user by email", async () => {
    const response = await request(app).get("/users/email/user1@example.com");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it("should return 404 for an email that does not exist", async () => {
    const response = await request(app).get("/users/email/failed@email.com");
    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
});
