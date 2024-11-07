import request from "supertest";
import { app } from "../../../app";
import { randomUUID } from "node:crypto";

let user = {
  id: null,
  username: null,
  email: null,
  password_hash: null,
};

beforeAll(async () => {
  const response = await request(app).get("/users/all");
  user = response.body.data[0];
});

/**
 * Test the User Get Routes
 * @group user
 * @group get
 * @group routes
 */
describe("Get User Routes", () => {
  /**
   * Get All Users Endpoint
   * @route GET /users/all
   * @returns {Promise<User>} 200 - Users found
   * @returns {Error} 404 - Users not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get all users endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get("/users/all");
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return all users", () => {
      it("should return an instance of Array", async () => {
        const response = await request(app).get("/users/all");
        expect(response.body.data).toBeInstanceOf(Array);
      });

      it("should return a user object", async () => {
        const response = await request(app).get("/users/all");
        expect(response.body.data[0]).toMatchObject({
          id: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
          password_hash: expect.any(String),
          created_at: expect.any(String),
        });
      });

      it("should return more than 1 object", async () => {
        const response = await request(app).get("/users/all");
        expect(response.body.data.length).toBeGreaterThan(1);
      });
    });
  });

  /**
   * Get User by ID Endpoint
   * @description Get a user by their ID.
   * @route GET /users/:uuid
   * @param {string} uuid.path.required - User ID
   * @returns {Promise<User>} 200 - User found
   * @returns {Error} 404 - User not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get user by ID endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get(`/users/${user.id}`);
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return a user by ID", () => {
      it("should return 200", async () => {
        const response = await request(app).get(`/users/${user.id}`);
        expect(response.status).toBe(200);
      });

      it("should return an instance of an object", async () => {
        const response = await request(app).get(`/users/${user.id}`);
        expect(response.body.data).toBeInstanceOf(Object);
      });

      it("should return a user object", async () => {
        const response = await request(app).get(`/users/${user.id}`);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
          password_hash: expect.any(String),
          created_at: expect.any(String),
        });
      });
    });

    describe("Endpoint should error", () => {
      it("should return 404 for a user that does not exist", async () => {
        const response = await request(app).get(`/users/${randomUUID()}`);
        expect(response.status).toBe(404);
      });

      it("should return 500 for a user ID that is not a UUID", async () => {
        const response = await request(app).get("/users/1234");
        expect(response.status).toBe(500);
      });
    });
  });

  /**
   * Get User by Username Endpoint
   * @description Get a user by their username.
   * @route GET /users/username/:username
   * @param {string} username.path.required - User username
   * @returns {Promise<User>} 200 - User found
   * @returns {Error} 404 - User not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get user by username endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get(`/users/username/${user.username}`);
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return a user by username", () => {
      it("should return a 200", async () => {
        const response = await request(app).get(`/users/username/${user.username}`);
        expect(response.status).toBe(200);
      });

      it("should return an instance of an object", async () => {
        const response = await request(app).get(`/users/username/${user.username}`);
        expect(response.body.data).toBeInstanceOf(Object);
      });

      it("should return a user object", async () => {
        const response = await request(app).get(`/users/username/${user.username}`);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
          password_hash: expect.any(String),
          created_at: expect.any(String),
        });
      });
    });

    describe("Endpoint should error", () => {
      it("should return 404 for a username that does not exist", async () => {
        const response = await request(app).get("/users/username/user100");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");
      });

      it("should return 500 for a username that is empty", async () => {
        const response = await request(app).get("/users/username/");
        expect(response.status).toBe(500);
      });
    });
  });

  /**
   * Get User by Email Endpoint
   * @description Get a user by their email.
   * @route GET /users/email/:email
   * @param {string} email.path.required - User email
   * @returns {Promise<User>} 200 - User found
   * @returns {Error} 404 - User not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get user by email endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get(`/users/email/${user.email}`);
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return a user by email", () => {
      it("should return a user by email", async () => {
        const response = await request(app).get(`/users/email/${user.email}`);
        expect(response.status).toBe(200);
      });

      it("should return an instance of an object", async () => {
        const response = await request(app).get(`/users/email/${user.email}`);
        expect(response.body.data).toBeInstanceOf(Object);
      });

      it("should return a user object", async () => {
        const response = await request(app).get(`/users/email/${user.email}`);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
          password_hash: expect.any(String),
          created_at: expect.any(String),
        });
      });
    });

    describe("Endpoint should error", () => {
      it("should return 404 for an email that does not exist", async () => {
        const response = await request(app).get("/users/email/randomemail@test.com");
        expect(response.status).toBe(404);
      });

      it("should return 500 for an email that is empty", async () => {
        const response = await request(app).get("/users/email/");
        expect(response.status).toBe(500);
      });

      it("should return 500 for an email that is not an email", async () => {
        const response = await request(app).get("/users/email/1234");
        expect(response.status).toBe(404);
      });
    });
  });
});
