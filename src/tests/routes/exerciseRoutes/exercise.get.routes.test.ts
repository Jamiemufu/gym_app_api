import request from "supertest";
import { app } from "../../../app";
import { randomUUID } from "node:crypto";
import { Length } from "class-validator";

let exercise: {
  id: string;
  name: string;
  muscle_group: string;
  equipment: string;
};

beforeEach(async () => {
  const response = await request(app).get("/exercise/all");
  exercise = response.body.data[0];
});

/**
 * Get Exercise Routes
 * @group exercise
 * @group get
 * @group routes
 */
describe("Get Exercise Routes", () => {
  /** Get ALL Exercises Endpoint
   * @description Test the GET /exercise/all endpoint
   * @route GET /exercise/all
   * @returns {Array<Exercise>} 200 - An array of exercises
   * @returns {Error} 404 - Exercise not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get all exercises endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200", async () => {
        const response = await request(app).get("/exercise/all");
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return exercises", () => {
      it("should return an instance of an array", async () => {
        const response = await request(app).get("/exercise/all");
        expect(response.body.data).toBeInstanceOf(Array);
      });

      it("should return an array with at least one item", async () => {
        const response = await request(app).get("/exercise/all");
        expect(response.body.data.length).toBeGreaterThan(0);
      });

      it("should return an array of objects with the correct properties", async () => {
        const response = await request(app).get("/exercise/all");
        expect(response.body.data[0]).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          muscle_group: expect.any(String),
          equipment: expect.any(String),
        });
      });
    });
  });

  /**
   * Get Exercise by ID Endpoint
   * @description Test the GET /exercise/:uuid endpoint
   * @route GET /exercise/:uuid
   * @param {string} uuid.path.required - Exercise ID
   * @returns {Exercise.model} 200 - An exercise object
   * @returns {Error} 404 - Exercise not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get exercise by ID endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200", async () => {
        const response = await request(app).get("/exercise/" + exercise.id);
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return an exercise using a correct uuid", () => {
      it("should return an item", async () => {
        const response = await request(app).get("/exercise/" + exercise.id);
        expect(response.body.data).toBeDefined();
      });

      it("should return an instance of object)", async () => {
        const response = await request(app).get("/exercise/" + exercise.id);
        expect(response.body.data).toBeInstanceOf(Object);
      });

      it("should return an object with the correct properties", async () => {
        const response = await request(app).get("/exercise/" + exercise.id);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          muscle_group: expect.any(String),
          equipment: expect.any(String),
        });
      });

      it("should return an object with the correct id", async () => {
        const response = await request(app).get("/exercise/" + exercise.id);
        expect(response.body.data.id).toBe(exercise.id);
      });
    });

    describe("Endpoint should return 404 for an exercise that does not exist", () => {
      it("should return 404", async () => {
        const response = await request(app).get("/exercise/" + randomUUID());
        expect(response.status).toBe(404);
      });
    });

    describe("Endpoint should return 500 for an exercise ID that is not a UUID", () => {
      it("should return 500", async () => {
        const response = await request(app).get("/exercise/1234");
        expect(response.status).toBe(500);
      });
    });

    describe("Endpoint should return 404 for an empty/null ID", () => {
      it("should return 500", async () => {
        const response = await request(app).get("/exercise/");
        expect(response.status).toBe(404);
      });
    });
  });

  /**
   * Get Exercise by Name Endpoint
   * @description Test the GET /exercise/name/:name endpoint
   * @route GET /exercise/name/:name
   * @param {string} name.path.required - Exercise name
   * @returns {Exercise.model} 200 - An exercise object
   * @returns {Error} 404 - Exercise not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get exercise by name endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200", async () => {
        const response = await request(app).get("/exercise/name/" + exercise.name);
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should return an exercise using a correct name", () => {
      it("should return an array of at least one item", async () => {
        const response = await request(app).get("/exercise/name/" + exercise.name);
        expect(response.body.data.length).toBeGreaterThan(0);
      });

      it("should return an instance of array", async () => {
        const response = await request(app).get("/exercise/name/" + exercise.name);
        expect(response.body.data).toBeInstanceOf(Array);
      });

      it("should return an array of objects with the correct properties", async () => {
        const response = await request(app).get("/exercise/name/" + exercise.name);
        expect(response.body.data[0]).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          muscle_group: expect.any(String),
          equipment: expect.any(String),
        });
      });
    });

    describe("Endpoint should return 404 for an exercise that does not exist", () => {
      it("should return 404", async () => {
        const response = await request(app).get("/exercise/name/exercise100");
        expect(response.status).toBe(404);
      });
    });

    describe("Endpoint should return 500 for an empty/null name", () => {
      it("should return 500", async () => {
        const response = await request(app).get("/exercise/name/");
        expect(response.status).toBe(500);
      });
    });
  });

  /**
   * Get Exercise by Muscle Group Endpoint
   * @description Test the GET /exercise/muscle-group/:muscleGroup endpoint
   * @route GET /exercise/muscle-group/:muscleGroup
   * @param {string} muscleGroup.path.required - Muscle group
   * @returns {Exercise.model} 200 - An exercise object
   * @returns {Error} 404 - Exercise not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get exercise by muscle group endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200", async () => {
        const response = await request(app).get("/exercise/muscle-group/" + exercise.muscle_group);
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should return an exercise using a correct muscle group", () => {
      it("should return an array of at least one item", async () => {
        const response = await request(app).get("/exercise/muscle-group/" + exercise.muscle_group);
        expect(response.body.data.length).toBeGreaterThan(0);
      });

      it("should return an instance of array)", async () => {
        const response = await request(app).get("/exercise/muscle-group/" + exercise.muscle_group);
        expect(response.body.data).toBeInstanceOf(Array);
      });

      it("should return an array of objects with the correct properties", async () => {
        const response = await request(app).get("/exercise/muscle-group/" + exercise.muscle_group);
        expect(response.body.data[0]).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          muscle_group: expect.any(String),
          equipment: expect.any(String),
        });
      });
    });

    describe("Endpoint should return 404 for a muscle group that does not exist", () => {
      it("should return 404", async () => {
        const response = await request(app).get("/exercise/muscle-group/leg");
        expect(response.status).toBe(404);
      });
    });

    describe("Endpoint should return 500 for an empty/null muscle group", () => {
      it("should return 500", async () => {
        const response = await request(app).get("/exercise/muscle-group/");
        expect(response.status).toBe(500);
      });
    });
  });

  /**
   * Get Exercise by Equipment Endpoint
   * @description Test the GET /exercise/equipment/:equipment endpoint
   * @route GET /exercise/equipment/:equipment
   * @param {string} equipment.path.required - Equipment
   * @returns {Exercise.model} 200 - An exercise object
   * @returns {Error} 404 - Exercise not found
   * @returns {Error} 500 - Internal server error
   */
  describe("Get exercise by equipment endpoint", () => {
    describe("Endpoint should exist", () => {
      it("should return 200", async () => {
        const response = await request(app).get("/exercise/equipment/" + exercise.equipment);
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return an equipment using a correct equipment", () => {
      it("should return an array of at least one item", async () => {
        const response = await request(app).get("/exercise/equipment/" + exercise.equipment);
        expect(response.body.data.length).toBeGreaterThan(0);
      });

      it("should return an instance of array)", async () => {
        const response = await request(app).get("/exercise/equipment/" + exercise.equipment);
        expect(response.body.data).toBeInstanceOf(Array);
      });

      it("should return an array of objects with the correct properties", async () => {
        const response = await request(app).get("/exercise/equipment/" + exercise.equipment);
        expect(response.body.data[0]).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          muscle_group: expect.any(String),
          equipment: expect.any(String),
        });
      });
    });

    describe("Endpoint should return 404 for an equipment that does not exist", () => {
      it("should return 404", async () => {
        const response = await request(app).get("/exercise/equipment/equipment100");
        expect(response.status).toBe(404);
      });
    });

    describe("Endpoint should return 500 for an equipment that is not a string or is empty", () => {
      it("should return 500", async () => {
        const response = await request(app).get("/exercise/equipment/");
        expect(response.status).toBe(500);
      });
    });
  });
});
