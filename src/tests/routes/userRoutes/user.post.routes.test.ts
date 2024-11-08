import request from "supertest";
import { app } from "../../../app";

let failedUser = {
  id: null,
  username: "failuser",
  email: "fail@email.com",
  password_hash: "123456",
};

/**
 * Test the Create User Endpoint
 * @group user
 * @group delete
 * @group routes
 */
describe("POST User Route", () => {
  /**
   * Create User Endpoint
   * @route POST /users/create
   * @returns {Promise<User>} 201 - User created
   * @returns {Error} 404 - Internal server error
   * @returns {Error} 500 - Internal server error
   */
  describe("Create user endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 404 when route does not exist", async () => {
        const response = await request(app).post("/users/random-route");
        expect(response.status).toBe(404);
      });

      it("should return 500 when route exists with no post data", async () => {
        const response = await request(app).post("/users/create");
        expect(response.status).toBe(500);
      });

      it("should return 201 when route exists", async () => {
        const response = await request(app).post("/users/create").send({
          username: "testuser",
          email: "test@example.com",
          password: "somelongpassword",
        });
        expect(response.status).toBe(201);
      });
    });

    describe("Endpoint should create a user", () => {
      it("should return a created user", async () => {
        const response = await request(app).post("/users/create").send({
          username: "testuser2",
          email: "example@test.com",
          password: "password",
        });
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
          password_hash: expect.any(String),
          created_at: expect.any(String),
        });
      });

      it("should return 201", async () => {
        const response = await request(app).post("/users/create").send({
          username: "testuser3",
          email: "testuser3@email.com",
          password: "password",
        });
        expect(response.status).toBe(201);
      });

      it("should return the correct user", async () => {
        const response = await request(app).post("/users/create").send({
          username: "testuser4",
          email: "testuser4@email.com",
          password: "password",
        });
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          username: "testuser4",
          email: "testuser4@email.com",
          password_hash: expect.any(String),
          created_at: expect.any(String),
        });
      });
    });
    describe("Endpoint should not create a user", () => {
      describe("When data is missing", () => {
        it("should return 500 when username is missing", async () => {
          const response = await request(app).post("/users/create").send({
            email: failedUser.email,
            password: failedUser.password_hash,
          });
          expect(response.status).toBe(500);
        });

        it("should return 500 when email is missing", async () => {
          const response = await request(app).post("/users/create").send({
            username: failedUser.username,
            password: failedUser.password_hash,
          });
          expect(response.status).toBe(500);
        });

        it("should return 500 when password is missing", async () => {
          const response = await request(app).post("/users/create").send({
            username: failedUser.username,
            email: failedUser.email,
          });
          expect(response.status).toBe(500);
        });

        it("should return 500 when username is empty", async () => {
          const response = await request(app).post("/users/create").send({
            username: "",
            email: failedUser.email,
            password: failedUser.password_hash,
          });
          expect(response.status).toBe(500);
        });

        it("should return 500 when email is empty", async () => {
          const response = await request(app).post("/users/create").send({
            username: failedUser.username,
            email: "",
            password: failedUser.password_hash,
          });
          expect(response.status).toBe(500);
        });

        it("should return 500 when password is empty", async () => {
          const response = await request(app).post("/users/create").send({
            username: failedUser.username,
            email: failedUser.email,
            password: "",
          });
          expect(response.status).toBe(500);
        });
      });

      describe("When data is invalid", () => {
        it("should return 500 when username is too short", async () => {
          const response = await request(app).post("/users/create").send({
            username: "1",
            email: failedUser.email,
            password: failedUser.password_hash,
          });
          expect(response.status).toBe(500);
        });

        it("should return 500 when email is not an email", async () => {
          const response = await request(app).post("/users/create").send({
            username: failedUser.username,
            email: "something",
            password: failedUser.password_hash,
          });
          expect(response.status).toBe(500);
        });

        it("should return 500 when password is too short", async () => {
          const response = await request(app).post("/users/create").send({
            username: failedUser.username,
            email: failedUser.email,
            password: "1",
          });
          expect(response.status).toBe(500);
        });
      });
    });
  });
});
