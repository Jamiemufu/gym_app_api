import request from "supertest";
import { app } from "../../../app";

/**
 * Test the Exercise Post Routes
 * @group exercise
 * @group post
 * @group routes
 */
describe("Post Exercise Routes", () => {
  /**
   * Create Exercise Endpoint
   * @route POST /exercise/create
   * @returns {Promise<Exercise>} 201 - Exercise created
   * @returns {Error} 404 - Internal server error
   * @returns {Error} 500 - Internal server error
   */
  describe("Create exercise route", () => {
    describe("Endpoint should exist", () => {
      it("should return 404 when route does not exist", async () => {
        const response = await request(app).post("/exercise/random-route");
        expect(response.status).toBe(404);
      });

      it("should return 500 when route exists with no post data", async () => {
        const response = await request(app).post("/exercise/create");
        expect(response.status).toBe(500);
      });

      it("should return 201 when route exists", async () => {
        const response = await request(app).post("/exercise/create").send({
          name: "Barbell Curl",
          muscle_group: "Arms",
          equipment: "Barbell",
        });
        expect(response.status).toBe(201);
      });
    });

    describe("Endpoint should create an exercise", () => {
      it("should return a created exercise", async () => {
        const response = await request(app).post("/exercise/create").send({
          name: "Tricpes Extension",
          muscle_group: "Triceps",
          equipment: "Cable",
        });
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          muscle_group: expect.any(String),
          equipment: expect.any(String),
        });
      });

      it("should return 201", async () => {
        const response = await request(app).post("/exercise/create").send({
          name: "Incline Skull Crushers",
          muscle_group: "Triceps",
          equipment: "Cable",
        });
        expect(response.status).toBe(201);
      });

      it("should return the correct exercise", async () => {
        let exercise = {
          name: "Sissy Squat",
          muscle_group: "Quads",
          equipment: "Bodyweight",
        };

        const response = await request(app).post("/exercise/create").send(exercise);
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          name: exercise.name,
          muscle_group: exercise.muscle_group,
          equipment: exercise.equipment,
        });
      });
    });
    describe("Endpoint should not create an exercise", () => {
      it("should return 500 when name is missing", async () => {
        const response = await request(app).post("/exercise/create").send({
          muscle_group: "Triceps",
          equipment: "Cable",
        });
        expect(response.status).toBe(500);
      });

      it("should return 500 when muscle_group is missing", async () => {
        const response = await request(app).post("/exercise/create").send({
          name: "Triceps Extension",
          equipment: "Cable",
        });
        expect(response.status).toBe(500);
      });

      it("should return 500 when equipment is missing", async () => {
        const response = await request(app).post("/exercise/create").send({
          name: "Triceps Extension",
          muscle_group: "Triceps",
        });
        expect(response.status).toBe(500);
      });
    });
  });
});
