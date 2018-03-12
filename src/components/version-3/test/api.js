const {assert} = require("chai");
const request = require("supertest");
const app = require("../app");
const knex = require("../database-connection");

describe("API requests", () => {
    beforeEach(done => {
        knex.seed.run().then(() => {
            done();
        });
    });
    describe("#Read", () => {
        it("reads a game", done => {
            request(app)
                .get("/games/2")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.game, {
                        id: 2,
                        name: "Fez",
                        developer: "Polytron",
                        rating: 7.4
                    });
                }).then(done).catch(done);
        });
    });
    describe("#List", () => {
        it("lists games", done => {
            request(app)
                .get("/games")
                .expect(200)
                .then(response => {
                    assert.deepEqual(response.body.games, [{
                        id: 1,
                        name: "Breath of the Wild",
                        developer: "Nintendo",
                        rating: 8.5
                    },{
                        id: 2,
                        name: "Fez",
                        developer: "Polytron",
                        rating: 7.4
                    },{
                        id: 3,
                        name: "Anti-Chamber",
                        developer: "Demruth",
                        rating: 8.1
                    }]);
                }).then(done).catch(done);
        });
    });
    describe("#Create", () => {
        it("creates a game", done => {
            request(app)
                .post("/games")
                .send({
                    name: "Braid",
                    developer: "Number None",
                    rating: 6.9
                }).expect(201)
                .then(response => {
                    assert.deepEqual(response.body.game, {
                        id: 4,
                        name: "Braid",
                        developer: "Number None",
                        rating: 6.9
                    });
                }).then(done).catch(done);
        });
    });
    describe("#Delete", () => {
        it("deletes a game", done => {
            request(app)
                .delete("/games/2")
                .expect(204)
                .then(response => {
                    return request(app)
                        .get("/games/2")
                        .expect(404);
                }).then(() => done()).catch(done);
        });
    });
    describe("#Update", () => {
        it("updates a game", done => {
            request(app)
                .put("/games/2")
                .send({
                    rating: 9.5
                }).expect(200)
                .then(response => {
                    return request(app)
                        .get("/games/2")
                        .expect(200)
                }).then(response => {
                    assert.deepEqual(response.body.game, {
                        id: 2,
                        name: "Fez",
                        developer: "Polytron",
                        rating: 9.5
                    });
                    return;
                }).then(done).catch(done);
        });
    });
});
