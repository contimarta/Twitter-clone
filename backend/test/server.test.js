import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import User from "../models/User.js";
import Peep from "../models/Peep.js";
import { expect } from "chai";
import testData from "./testData/testData.js";

const testUsers = testData.users;
const testPeeps = testData.peeps;

chai.use(chaiHttp);

const testServer = chai.request(app).keepOpen();

beforeEach(async () => {
  try {
    await User.insertMany(testUsers);
    console.log(`Database populated with testUsers`);
    await Peep.insertMany(testPeeps);
    console.log(`Database populated with testPeeps`);
  } catch (error) {
    console.log(error.message);
    // Terminate the test
    throw new Error();
  }
});

afterEach(async () =>{
  try {
    await Peep.deleteMany();
    await User.deleteMany();
    console.log(`Database cleared`);
  } catch (error) {
    console.log(`Error clearing`);
    throw new Error();
  }
})

describe("App", () => {
  describe("GET /nonexistent", () => {
    it("should return a 404 status for a nonexistent route", async () => {
      const res = await testServer.get("/nonexistent");
      expect(res).to.have.status(404);
    });
  });

  describe("Peeps", () => {
    describe("GET /peeps", () => {
      it("should return all peeps", async () => {
        try {
          const res = await testServer.get("/peeps");
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("array");
        } catch (err) {
          throw err;
        }
      });
    });

    describe("POST /peeps", () => {
      it("should create a new peep ", async () => {
        const userCredentials = {
          email: "marta@chitter.com",
          password: "password",
        };

        const loginResponse = await testServer
          .post("/users/login")
          .send(userCredentials);

        const token = loginResponse.body.token;
        const userId = loginResponse.body.user._id;

        const res = await testServer
          .post("/peeps")
          .set("Authorization", `Bearer ${token}`)
          .send({ content: "Test peep", userId });

        expect(res).to.have.status(201);
        expect(res.body).to.be.a("object");
        expect(res.body.peep.content).to.equal("Test peep");
      });
    });
  });

  describe("Users", () => {
    describe("POST /users/login", () => {
      it("should authenticate an existing user ", async () => {
        const credentials = {
          email: "marta@chitter.com",
          password: "password",
        };

        const res = await testServer.post("/users/login").send(credentials);

        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.token).to.be.a("string");
      });

      it("should not authenticate a user with invalid credentials", async () => {
        const invalidCredentials = {
          email: "marta@chitter.com",
          password: "wrongpassword",
        };

        const res = await testServer
          .post("/users/login")
          .send(invalidCredentials);

        expect(res).to.have.status(500);
      });
    });

    describe("POST /users/register", () => {
      it("should create a new user ", async () => {
        const newUser = {
          username: "testuser",
          name: "Test User",
          email: "test@example.com",
          password: "testpassword",
        };

        const res = await testServer.post("/users/register").send(newUser);

        expect(res).to.have.status(201);
        expect(res.body).to.be.a("object");
        expect(res.body.user.username).to.equal(newUser.username);
        expect(res.body.user.name).to.equal(newUser.name);
        expect(res.body.user.email).to.equal(newUser.email);
      });
    });
  });
});
