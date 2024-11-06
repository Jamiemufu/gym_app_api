import request from "supertest";
import { app } from "../../../app";
import { randomUUID } from "node:crypto";

let exercise = {
  id: null,
  name: null,
  muscle_group: null,
  equipment: null,
};

beforeAll(async () => {
  /**
   * {
      id: '{UUID}',
      name: 'Bench Press',
      muscle_group: 'Chest',
      equipment: 'Barbell'
    }
   */
  const response = await request(app).get("/exercise/all");
  exercise = response.body.data[0];
});

/**
 * Test the Exercise Put Routes
 * @group exercise
 * @group put
 * @group routes
 * @route PUT /exercise/update/:uuid
 * @returns {Promise<Exercise>} 200 - Exercise updated
 * @returns {Error} 404 - Exercise not found
 * @returns {Error} 500 - Internal server error
 */
describe("Exercise Put Routes", () => {
  describe("Update exercise route", () => {
    describe("Endpoint should exist", () => {
      it("should return 404 when route does not exist", async () => {
        const response = await request(app).put("/exercise/random-route");
        expect(response.status).toBe(404);
      });

      it("should return 500 when route exists with no put data", async () => {
        const response = await request(app).put("/exercise/update/123");
        expect(response.status).toBe(304);
      });

      it("should return 200 when route exists", async () => {
        const response = await request(app)
          .put("/exercise/update/" + exercise.id)
          .send({
            name: "Barbell Bench Press",
            muscle_group: "Chest",
            equipment: "Barbell",
          });
        expect(response.status).toBe(200);
      });
    });
    describe("Endpoint should update an exercise", () => {
      it("should return 200 when updating an exercise", async () => {
        const response = await request(app)
          .put("/exercise/update/" + exercise.id)
          .send({
            name: "Barbell Bench Press TEST",
            muscle_group: "Chest",
            equipment: "Barbell",
          });
        expect(response.status).toBe(200);
      });

      it("should return a instance of an object", async () => {
        const response = await request(app)
          .put("/exercise/update/" + exercise.id)
          .send({
            name: "Barbell Bench Press",
            muscle_group: "Chest",
            equipment: "Barbell",
          });
        expect(response.body.data).toBeInstanceOf(Object);
      });

      it("should return an object matching an exercise", async () => {
        const response = await request(app)
          .put("/exercise/update/" + exercise.id)
          .send({
            name: "Bench Press",
            muscle_group: "Chest",
            equipment: "Barbell",
          });
        expect(response.body.data).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          muscle_group: expect.any(String),
          equipment: expect.any(String),
        });
      });

      it("should return 200 when updating an exercise name only", async () => {
        const response = await request(app)
          .put("/exercise/update/" + exercise.id)
          .send({
            name: "Bench Press test",
          });
        expect(response.status).toBe(200);
      });

      it("should return 200 when updating an exercise muscle_group only", async () => {
        const response = await request(app)
          .put("/exercise/update/" + exercise.id)
          .send({
            muscle_group: "Chest test",
          });
        expect(response.status).toBe(200);
      });

      it("should return 200 when updating an exercise equipment only", async () => {
        const response = await request(app)
          .put("/exercise/update/" + exercise.id)
          .send({
            equipment: "Barbell test",
          });
        expect(response.status).toBe(200);
      });
    });

    describe("Endpoint should return an error", () => {
      it("should return 404 when updating a non-existent exercise", async () => {
        const response = await request(app)
          .put("/exercise/update/" + randomUUID())
          .send({
            name: "Barbell Bench Press TEST",
            muscle_group: "Chest",
            equipment: "Barbell",
          });
        expect(response.status).toBe(404);
      });

      it("should return 304 when updating an exercise with the same data", async () => {
        const response = await request(app)
          .put("/exercise/update/" + exercise.id)
          .send({
            name: "Bench Press test",
            muscle_group: "Chest test",
            equipment: "Barbell test",
          });
        expect(response.status).toBe(304);
      });

      it("should return 304 when updating an exercise with no data", async () => {
        const response = await request(app).put("/exercise/update/" + exercise.id);
        expect(response.status).toBe(304);
      });
    });
  });
});
