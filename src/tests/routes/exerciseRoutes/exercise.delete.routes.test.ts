import request from "supertest";
import { app } from "../../../app";
import { randomUUID } from "node:crypto";

let linkedExercise = {
  id: null,
  name: null,
  muscle_group: null,
  equipment: null,
};

let unlinkedExercise = {
  id: null,
  name: null,
  muscle_group: null,
  equipment: null,
};

beforeEach(async () => {
  // select an exercise that is NOT associated with any workout
  const response = await request(app).get("/exercise/all");
  unlinkedExercise = response.body.data[response.body.data.length - 1];
  linkedExercise = response.body.data[0];
});

/**
 * Test the DELETE exercise route
 * @group exercise
 * @group delete
 * @group routes
 * @route DELETE /exercise/delete/:uuid
 * @returns {Promise<Exercise>} 204 - Exercise deleted
 * @returns {Error} 404 - Exercise not found
 * @returns {Error} 500 - Internal server error
 */
describe("Exercise Delete Route", () => {
  describe("Endpoint should exist", () => {
    it("should return 404 when route does not exist", async () => {
      const response = await request(app).delete("/exercise/random-route");
      expect(response.status).toBe(404);
    });

    it("should return 204 when route exists", async () => {
      const response = await request(app).delete(`/exercise/delete/${unlinkedExercise.id}`);
      expect(response.status).toBe(204);
    });
  });
  describe("Endpoint should delete an exercise", () => {
    it("should return 204 when deleting an exercise", async () => {
      const response = await request(app).delete(`/exercise/delete/${unlinkedExercise.id}`);
      expect(response.status).toBe(204);
    });
  });

  describe("Endpoint should return an error", () => {
    it("should return 404 when deleting a non-existent exercise", async () => {
      const response = await request(app).delete(`/exercise/delete/${randomUUID()}`);
      expect(response.status).toBe(404);
    });

    it("should return 404 when deleting an exercise without an ID", async () => {
      const response = await request(app).delete("/exercise/delete/");
      expect(response.status).toBe(404);
    });

    it("should return 500 when deleting an exercise that has a Foreign Key", async () => {
      const response = await request(app).delete(`/exercise/delete/${linkedExercise.id}`);
      expect(response.status).toBe(500);
    });
  });
});
