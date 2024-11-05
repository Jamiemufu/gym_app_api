import request from "supertest";
import { app } from "../../app";

describe("Exercise Routes", () => {
  let exercise: {
    id: string;
    name: string;
    muscle_group: string;
    created_at: string;
  };

  it("should return all exercises", async () => {
    const response = await request(app).get("/exercise/all");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    //udpate user to first user in array to get ID
    exercise = response.body.data[0];
  });
});
