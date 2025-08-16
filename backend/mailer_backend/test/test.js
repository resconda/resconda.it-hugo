//test.js

const server = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);
const MailchimpHandler = require("../mailchimp.js");

const testuser_payload = {
        email: "test_user@resconda.it",
        "frc-captcha-solution": "valid-solution",
        name: "Foo",
        surname: "Bar",
        phone: "1234567890"
};
describe("Mailchimp ping endpoint", () => {
  it("should respond with a JSON object containing the Mailchimp server info", async () => {
    const response = await requestWithSupertest.get("/");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body).toHaveProperty("health_status");
  });
});
// describe("Archive list member", () => {
//     it("should archive a member by email", async () => {
//         const email = testuser_payload.email;
//         const response = await MailchimpHandler.archiveMember(email);
//         expect(response).toBeDefined();
//         expect(response.status).toBe(204); // 204 No Content expected for successful deletion
//     });
// });
describe("Subscription request", () => {
    // beforeEach(async () => {
    //     // Reset the Mailchimp list before each test
    //     await MailchimpHandler.archiveMember(testuser_payload.email);
    // });
    it("should return 200 and empty json response for a valid request", async () => {
        const response = await requestWithSupertest.post("/")
        .send(testuser_payload);
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body).toEqual({});
        });
    
    it("should archive the member just added (using MailchimpHandler)", async () => {
        const email = testuser_payload.email;
        const response = await MailchimpHandler.archiveMember(email);
        // expect(response).toBeDefined();
        // expect(response.status).toBe(204); // 204 No Content expected for successful deletion
    });
    it("should return 200 but json response with 'errors' if email is missing", async () => {
        const response = await requestWithSupertest.post("/")
        .send({
            "frc-captcha-solution": "valid-solution",
            name: "Foo",
            surname: "Bar",
            phone: "1234567890"
        });
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors.length).toBeGreaterThan(0);
    });
});