import request from "supertest";
import { app } from "../../../app";
import { randomUUID } from "node:crypto";

let user = {
  id: null,
  username: null,
  email: null,
  password_hash: null,
};

beforeEach(async () => {
  // get a new user to delete
  const response = await request(app).get("/users/all");
  user = response.body.data[0];
});

  /**
   * Test the Delete User Endpoint
   * @group user
   * @group delete
   * @group routes
   * @route DELETE /users/delete/:uuid
   * @param {string} uuid.path.required - User ID
   * @returns {Promise<User>} 204 - User deleted
   * @returns {Error} 404 - User not found
   * @returns {Error} 500 - Internal server error
   */
describe("Delete User Routes", () => {

  describe("Delete user endpoint", () => {
    describe("Endpoint should exist", () => {

      it('should return 404 when route does not exist', async () => {
        const response = await request(app).delete('/users/random-route');
        expect(response.status).toBe(404);
      });

      it("should return 200 when route exists", async () => {
        const response = await request(app).delete(`/users/delete/${user.id}`);
        expect(response.status).toBe(204);
      });
    });

    describe("Endpoint should delete user", () => {
      it("should return a 204 on deletion", async () => {
        const response = await request(app).delete(`/users/delete/${user.id}`);
        expect(response.status).toBe(204);
      });
    });
    describe("Endpoint should error", () => {
      it("should return a 404 where a user does not exist", async () => {
        const response = await request(app).delete(`/users/delete/${randomUUID()}`);
        expect(response.status).toBe(404);
      });

      it("should return a 404 when no ID is passed", async () => {
        const response = await request(app).delete(`/users/delete/`);

        expect(response.status).toBe(404);
      });

      it('should return 500 when an invalid ID is passed', async () => {
        const response = await request(app).delete(`/users/delete/1234`);
        expect(response.status).toBe(500);
      });
    });
  });
});
