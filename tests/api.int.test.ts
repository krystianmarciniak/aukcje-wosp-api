/// <reference types="jest" />
import request from "supertest";
import { app } from "../src/app/app.js";

describe("Categories", () => {
  it("POST /api/categories -> 201", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("Content-Type", "application/json")
      .send({ name: "Elektronika" });
    expect(res.status).toBe(201);
  });

  it("POST /api/categories -> 400 VALIDATION_ERROR", async () => {
    const res = await request(app).post("/api/categories").send({}).expect(400);

    expect(res.body).toHaveProperty("error", "VALIDATION_ERROR");
    expect(typeof res.body.message).toBe("string");
  });

  it("GET /api/categories -> 200 (DTO bez _count + jest auctionCount)", async () => {
    await request(app).post("/api/categories").send({ name: "Książki" }).expect(201);

    const res = await request(app).get("/api/categories").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);

    expect(res.body[0]).not.toHaveProperty("_count");
    expect(res.body[0]).toHaveProperty("auctionCount");
  });

  it("GET /api/categories/:id -> 200", async () => {
    const created = await request(app).post("/api/categories").send({ name: "Sport" }).expect(201);

    const res = await request(app).get(`/api/categories/${created.body.id}`).expect(200);
    expect(res.body).toHaveProperty("id", created.body.id);
    expect(res.body).toHaveProperty("name", "Sport");
  });

  it("DELETE /api/categories/:id -> 204", async () => {
    const created = await request(app).post("/api/categories").send({ name: "Do usunięcia" }).expect(201);

    await request(app).delete(`/api/categories/${created.body.id}`).expect(204);
  });

  it("GET /api/categories/:id/auctions -> 200 (pusta lista gdy brak aukcji)", async () => {
    const cat = await request(app).post("/api/categories").send({ name: "AGD" }).expect(201);

    const res = await request(app).get(`/api/categories/${cat.body.id}/auctions`).expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it("GET /api/categories/:id/auctions -> 404 (gdy kategoria nie istnieje)", async () => {
    const res = await request(app).get("/api/categories/does-not-exist/auctions").expect(404);

    // nie zgadujemy kodu domenowego dopóki nie widzimy requireCategory()
    expect(res.body).toHaveProperty("error");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Auctions", () => {
  it("POST /api/auctions -> 201 (w kategorii)", async () => {
    const cat = await request(app).post("/api/categories").send({ name: "Dom" }).expect(201);

    const res = await request(app)
      .post("/api/auctions")
      .send({
        title: "Lampa vintage",
        description: "Stan bardzo dobry",
        status: "ACTIVE",
        currentPrice: 10,
        categoryId: cat.body.id,
        url: "https://example.com/aukcja/1",
      })
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title", "Lampa vintage");
    expect(res.body).toHaveProperty("categoryId", cat.body.id);
  });

  it("POST /api/auctions -> 400 (Zod validation)", async () => {
    const res = await request(app).post("/api/auctions").send({}).expect(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("details");
  });

  it("GET /api/auctions/:id -> 404 (gdy aukcja nie istnieje)", async () => {
    const res = await request(app).get("/api/auctions/does-not-exist").expect(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body).toHaveProperty("message");
  });
});
