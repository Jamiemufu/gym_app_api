import request from "supertest";
import { app } from "../../../app";
import { randomUUID } from "node:crypto";

let mesocycle = {
  id: null,
  users: [],
  workouts: [],
  name: "",
  length: 0,
  phase: "",
  periodization: false,
};

beforeAll(async () => {
  const response = await request(app).get("/mesocycle/all");
  mesocycle = response.body.data[0];
});

/**
 * Test the Mesocycle Get Routes
 * @group mesocycle
 * @group get
 * @group routes
 */
describe("Get Mesocycle Routes", () => {
  describe("Get all mesocycles endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get("/mesocycle/all");
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should return all mesocycles", () => {
      it("should return an instance of Array", async () => {
        const response = await request(app).get("/mesocycle/all");
        expect(response.body.data).toBeInstanceOf(Array);
      });
      it("should return a mesocycle object with users and workout relations", async () => {
        const response = await request(app).get("/mesocycle/all");
        expect(response.body.data[0]).toMatchObject({
          id: expect.any(String),
          users: expect.any(Array),
          workouts: expect.any(Array),
          name: expect.any(String),
          length: expect.any(Number),
          phase: expect.any(String),
          periodization: expect.any(Boolean),
        });
      });
      it("should return more than 1 object", async () => {
        const response = await request(app).get("/mesocycle/all");
        expect(response.body.data.length).toBeGreaterThan(1);
      });
    });
  });

  /**
   * Get mesocycle by id
   * @route GET /mesocycle/:uuid
   * @param {string} uuid.path.required - Mesocycle ID
   * @returns Promise<void>
   * @returns {Error} 404 - Mesocycle not found
   * @returns {Error} 500 - Internal server error
   * @returns {Error} 200 - Mesocycle found
   */
  describe("Get mesocycle by id", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}`);
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return a mesocycle by id", () => {
      it("should return a mesocycle object without users and workout relations", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}`);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          length: expect.any(Number),
          phase: expect.any(String),
          periodization: expect.any(Boolean),
        });
      });
      it("should return 200 status", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}`);
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should return 404", () => {
      it("should return 404 when mesocycle not found", async () => {
        const response = await request(app).get("/mesocycle/" + randomUUID());
        expect(response.status).toBe(404);
      });
    });
    describe("Endpoint should return 500", () => {
      it("should return 500 when ID is not a UUID", async () => {
        const response = await request(app).get("/mesocycle/12323");
        expect(response.status).toBe(500);
      });
    });
  });
  /**
   * Get mesocycle by id with relations
   * @route GET /mesocycle/:uuid/all
   * @param {string} uuid.path.required - Mesocycle ID
   * @returns Promise<void>
   * @returns {Error} 404 - Mesocycle not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get mesocycle by id with relations", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/all`);
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return a mesocycle by id with relations", () => {
      it("should return a mesocycle object with users and workout relations", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/all`);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          users: expect.any(Array),
          workouts: expect.any(Array),
          name: expect.any(String),
          length: expect.any(Number),
          phase: expect.any(String),
          periodization: expect.any(Boolean),
        });
      });
      it("should return 200 status", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/all`);
        expect(response.status).toBe(200);
      });
      it("should return the correct mesocycle", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/all`);
        expect(response.body.data).toEqual(mesocycle);
      });
    });
    describe("Endpoint should 404", () => {
      it("should return 404 when mesocycle not found", async () => {
        const response = await request(app).get("/mesocycle/" + randomUUID() + "/all");
        expect(response.status).toBe(404);
      });
    });
    describe("Endpoint should return 500", () => {
      it("should return 500 when ID is not a UUID", async () => {
        const response = await request(app).get("/mesocycle/12323/all");
        expect(response.status).toBe(500);
      });
    });
  });
  /**
   * Get mesocycle by name
   * @route GET /mesocycle/name/:name
   * @param {string} name.path.required - Mesocycle name
   * @returns Promise<Mesocycle>
   * @returns {Error} 404 - Mesocycle not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get mesocycle by name", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get(`/mesocycle/name/${mesocycle.name}`);
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return a mesocycle by name", () => {
      it("should return a mesocycle object without users and workout relations", async () => {
        const response = await request(app).get(`/mesocycle/name/${mesocycle.name}`);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          length: expect.any(Number),
          phase: expect.any(String),
          periodization: expect.any(Boolean),
        });
      });
      it("should return 200 status", async () => {
        const response = await request(app).get(`/mesocycle/name/${mesocycle.name}`);
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should return 404", () => {
      it("should return 404 when mesocycle not found", async () => {
        const response = await request(app).get("/mesocycle/name/" + "randomName");
        expect(response.status).toBe(404);
      });
    });
    describe("Endpoint should return 500", () => {
      it("should return 500 when name is not a string", async () => {
        const response = await request(app).get("/mesocycle/name/");
        expect(response.status).toBe(500);
      });
    });
  });

  /**
   * Get workouts by mesocycle id
   * @route GET /mesocycle/:id/workout
   * @param {string} id.path.required - Mesocycle ID
   * @returns Promise<void>
   * @returns {Error} 404 - Mesocycle not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get workouts by mesocycle id", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/workout`);
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should return workouts by mesocycle id", () => {
      it("should return a Mesocycle object containing workouts", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/workout`);
        console.log(response.body.data);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          length: expect.any(Number),
          phase: expect.any(String),
          periodization: expect.any(Boolean),
          workouts: expect.any(Array),
        });
      });
      it("should contain a workout in the mesocycle", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/workout`);
        expect(response.body.data.workouts[0]).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          created_at: expect.any(String),
        });
      });
      it('should contain an array of workouts', async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/workout`);
        expect(response.body.data.workouts).toBeInstanceOf(Array);
      });
      it("should return 200 status", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/workout`);
        expect(response.status).toBe(200);
      });
      it("should return a single object", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/workout`);
        // a single object wil have a key length of 6
        let length = Object.keys(response.body.data).length;
        expect(length).toBeLessThanOrEqual(6);
      });
    });
    describe("Endpoint should return 404", () => {
      it("should return 404 when mesocycle not found", async () => {
        const response = await request(app).get("/mesocycle/" + randomUUID() + "/workout");
        expect(response.status).toBe(404);
      });
    });
    describe("Endpoint should return 500", () => {
      it("should return 500 when ID is not a UUID", async () => {
        const response = await request(app).get("/mesocycle/12323/workout");
        expect(response.status).toBe(500);
      });
    });
  });
  /**
   * Get users by mesocycle ID
   * @route GET /mesocycle/:uuid/users
   * @param {string} uuid.path.required - Mesocycle ID
   * @returns Promise<void>
   * @returns {Error} 404 - Mesocycle not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get users by mesocycle ID", () => {
    describe("Endpoint should exist", () => {
      it("should return 200 when route exists", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/users`);
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should return all users of a mesocycle", () => {
      it("should return an instance of Array", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/users`);
        expect(response.body.data).toBeInstanceOf(Array);
      });
      it("should return a user object", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/users`);
        expect(response.body.data[0]).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          created_at: expect.any(String),
        });
      });
      it("should return 200 status", async () => {
        const response = await request(app).get(`/mesocycle/${mesocycle.id}/users`);
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should return 404", () => {
      it("should return 404 when mesocycle not found", async () => {
        const response = await request(app).get("/mesocycle/" + randomUUID() + "/users");
        expect(response.status).toBe(404);
      });
    });

    describe("Endpoint should return 500", () => {
      it("should return 500 when ID is not a UUID", async () => {
        const response = await request(app).get("/mesocycle/12323/users");
        expect(response.status).toBe(500);
      });
    });
  });
});
