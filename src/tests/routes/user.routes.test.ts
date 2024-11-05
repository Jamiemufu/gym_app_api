import request from "supertest";
import { app } from "../../app";
import { randomUUID } from "node:crypto";

describe("User Routes", () => {
  let user: {
    id: string;
    username: string;
    email: string;
    password_hash: string;
  };

  it("should return all users", async () => {
    const response = await request(app).get("/users/all");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    //udpate user to first user in array to get ID
    user = response.body.data[0];
  });

  it("should return a user by ID", async () => {
    const response = await request(app).get("/users/" + user.id);

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      password_hash: expect.any(String),
      created_at: expect.any(String),
    });
  });

  it("should return 404 for a user that does not exist", async () => {
    const response = await request(app).get("/users/" + randomUUID());
    expect(response.status).toBe(404);
  });

  it("should return 500 for a user ID that is not a UUID", async () => {
    const response = await request(app).get("/users/1234");
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

  it("should return a user by username", async () => {
    const response = await request(app).get("/users/username/" + user.username);
    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      password_hash: expect.any(String),
      created_at: expect.any(String),
    });
  });

  it("should return 404 for a username that does not exist", async () => {
    const response = await request(app).get("/users/username/user100");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("should return a user by email", async () => {
    const response = await request(app).get("/users/email/" + user.email);
    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      password_hash: expect.any(String),
      created_at: expect.any(String),
    });
  });

  it("should return 404 for an email that does not exist", async () => {
    const response = await request(app).get("/users/email/failed@email.com");
    expect(response.status).toBe(404);
  });

  it("should create a new user", async () => {
    const response = await request(app).post("/users/create").send({
      username: "testuser",
      email: "test@user.com",
      password: "password",
    });

    // store new user data for deletion
    user = {
      id: response.body.data.id,
      username: response.body.data.username,
      email: response.body.data.email,
      password_hash: response.body,
    };

    expect(response.status).toBe(201);
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      password_hash: expect.any(String),
      created_at: expect.any(String),
    });
  });

  it("should 500 when creating a user with an invalid email", async () => {
    const response = await request(app).post("/users/create").send({
      username: "testuser",
      email: "testuser.com",
      password: "password",
    });
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

  it("should 500 when creating a user with an invalid username", async () => {
    const response = await request(app).post("/users/create").send({
      username: "",
      email: "email@example.com",
      password: "password",
    });
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

  it("should 500 when creating a user with an invalid password", async () => {
    const response = await request(app).post("/users/create").send({
      username: "testuser",
      email: "email@example.com",
      password: "",
    });
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

  it("should 500 when creating a user with an existing email", async () => {
    const response = await request(app).post("/users/create").send({
      username: "testuser",
      email: user.email,
      password: "password",
    });
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

  it("should 500 when creating a user with an existing username", async () => {
    const response = await request(app).post("/users/create").send({
      username: user.username,
      email: "email@example.com",
      password: "password",
    });
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

  it("should delete a user by ID", async () => {
    const response = await request(app).delete("/users/delete/" + user.id);
    expect(response.status).toBe(204);
  });

  it("should return 404 for a user that does not exist", async () => {
    const response = await request(app).delete("/users/delete/" + randomUUID());
    expect(response.status).toBe(404);
  });
});
