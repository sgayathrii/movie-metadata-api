import request from "supertest";
import app from "./src/app";

describe("Movie API Endpoints", () => {
  describe("GET /api/movies", () => {
    it("should return a list of movies", async () => {
      const response = await request(app).get("/api/movies");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("pagination");
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});

describe('PUT /api/movies/:id', () => {
    it('should update a movie', async () => {
      const movieId = 3423; 
      const updatedData = { title: 'Updated Movie Title' };

      const response = await request(app)
        .put(`/api/movies/${movieId}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.title).toBe(updatedData.title);
    });
});