import request from "supertest";
import { app } from "../../../app";

let user = {
  id: null,
  username: null,
  email: null,
  password_hash: null,
};

let meso = {
  id: null,
  name: null,
  length: null,
  phase: null,
  periodization: null,
};

beforeAll(async () => {
  const mesocycle = await request(app).get("/mesocycle/all");
  meso = mesocycle.body.data[0];

  const users = await request(app).get("/users/all");
  user = users.body.data[0];
});

/**
 *  Test the create Mesocycle Endpoint
 * @group mesocycle
 * @group create
 * @group routes
 */
describe("POST Mesocycle Route", () => {
  /**
   * Create mesocycle endpoint
   * @route POST /mesocycle/create
   * @returns {Promise<Mesocycle>} - 201 - Mesocycle created
   * @returns {Error} - 404 Mesocycle not found
   * @returns {Error} - 500 Internal server error
   */
  describe("Endpoint should exist", () => {
    it("should return a 404 wheh route does not exist", async () => {
      const response = await request(app).post("/meso/randon-route");
      expect(response.status).toBe(404);
    });

    it("should return a 500 when route exists with no post data", async () => {
      const response = await request(app).post("/mesocycle/create/" + user.id);
      expect(response.status).toBe(500);
    });

    it("should return a 201 when route exists with correct post data", async () => {
      const response = await request(app)
        .post("/mesocycle/create/" + user.id)
        .send({
          name: meso.name,
          length: meso.length,
          phase: meso.phase,
          periodization: "true",
          user: [user.id],
        });
        console.log(response.body);
      expect(response.status).toBe(201);
    });

    describe("Endpoint should validate post data", () => {
      it("should return a 500 when name is missing", async () => {
        const response = await request(app)
          .post("/mesocycle/create/" + user.id)
          .send({
            length: meso.length,
            phase: meso.phase,
            periodization: "true",
            user: [user.id],
          });
        expect(response.status).toBe(500);
      });

      it("should return a 500 when length is missing", async () => {
        const response = await request(app)
          .post("/mesocycle/create/" + user.id)
          .send({
            name: meso.name,
            phase: meso.phase,
            periodization: "true",
            user: [user.id],
          });
        expect(response.status).toBe(500);
      });

      it("should return a 500 when phase is missing", async () => {
        const response = await request(app)
          .post("/mesocycle/create/" + user.id)
          .send({
            name: meso.name,
            length: meso.length,
            periodization: "true",
            user: [user.id],
          });
        expect(response.status).toBe(500);
      });

      it("should return a 500 when periodization is missing", async () => {
        const response = await request(app)
          .post("/mesocycle/create/" + user.id)
          .send({
            name: meso.name,
            length: meso.length,
            phase: meso.phase,
            user: [user.id],
          });
        expect(response.status).toBe(500);
      });
    });
  });
});
