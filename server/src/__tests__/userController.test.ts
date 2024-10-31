import request from "supertest";
import { app } from "../app";
import { UserModel } from "../models/UserModel";

const validUserData = {
  username: "validUsername",
  hashedPassword: "hashedPasswordHere",
  email: "test@example.com",
  phoneNumber: "1234567890",
  firstName: "John",
  lastName: "Doe",
  joinDate: new Date().toISOString(),
  isSupplier: true,
};

// Mocker the UserModel to avoid making actual Database calls

jest.mock("../models/userModel");

describe("UserController createUser - Username Validation", () => {
  const invalidUsernames = [
    {
      username: 123465678,
      description: "non-string type",
      error: "Username must be a string",
    },
    {
      username: "short",
      description: "too short",
      error: "Username must be at least 8 characters long",
    },
    {
      username: "thisusernameiswaytoolongtobevalid",
      description: "too long",
      error: "Username must be no longer than 20 characters",
    },
    {
      username: "invalid*char",
      description: "contains invalid characters",
      error: "Username must contain letters, numbers, or underscores",
    },
  ];

  it.each(invalidUsernames)(
    "should return 400 when username is invalid: $description",
    async ({ username, error }) => {
      const response = await request(app)
        .post("/users")
        .send({ ...validUserData, username });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error);
    }
  );
});

describe("UserController createUser - Hashed Password Validation", () => {
  const invalidPasswords = [
    {
      hashedPassword: 123456789012,
      description: "non-string type",
      error: "Hashed password must be a string",
    },
    {
      hashedPassword: "shortpass",
      description: "too short",
      error: "Hashed password must be at least 12 characters long",
    },
  ];

  it.each(invalidPasswords)(
    "should return 400 when hashedPassword is invalid: $description",
    async ({ hashedPassword, error }) => {
      const response = await request(app)
        .post("/users")
        .send({ ...validUserData, hashedPassword });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error);
    }
  );
});

describe("UserController createUser - Email Validation", () => {
  const invalidEmails = [
    {
      email: "invalidemail",
      description: "missing domain",
      error: "Invalid email address",
    },
    {
      email: "invalid@.com",
      description: "missing username",
      error: "Invalid email address",
    },
    {
      email: 12345,
      description: "non-string type",
      error: "Invalid email address",
    },
  ];

  it.each(invalidEmails)(
    "should return 400 when email is invalid: $description",
    async ({ email, error }) => {
      const response = await request(app)
        .post("/users")
        .send({ ...validUserData, email });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error);
    }
  );
});

describe("UserController createUser - Phone Number Validation", () => {
  const invalidPhoneNumbers = [
    {
      phoneNumber: "12345",
      description: "too short",
      error:
        "Invalid phone number. Must contain only digits and be between 10-15 characters long.",
    },
    {
      phoneNumber: "1234567890123456",
      description: "too long",
      error:
        "Invalid phone number. Must contain only digits and be between 10-15 characters long.",
    },
    {
      phoneNumber: "12345abcde",
      description: "contains non-digit characters",
      error:
        "Invalid phone number. Must contain only digits and be between 10-15 characters long.",
    },
    {
      phoneNumber: 1234567890,
      description: "non-string type",
      error:
        "Invalid phone number. Must contain only digits and be between 10-15 characters long.",
    },
  ];

  it.each(invalidPhoneNumbers)(
    "should return 400 when phoneNumber is invalid: $description",
    async ({ phoneNumber, error }) => {
      const response = await request(app)
        .post("/users")
        .send({ ...validUserData, phoneNumber });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error);
    }
  );
});

describe("UserController createUser - Name Validation", () => {
  const invalidNames = [
    {
      firstName: "Jo",
      description: "first name too short",
      error: "First name must be between 3 and 25 characters.",
    },
    {
      firstName: "A".repeat(26),
      description: "first name too long",
      error: "First name must be between 3 and 25 characters.",
    },
    {
      lastName: "D",
      description: "last name too short",
      error: "Last name must be between 2 and 25 characters.",
    },
    {
      lastName: "B".repeat(26),
      description: "last name too long",
      error: "Last name must be between 2 and 25 characters.",
    },
    {
      firstName: "John3",
      description: "first name contains numbers",
      error: "Your name must not include numbers",
    },
    {
      lastName: "Doe!",
      description: "last name contains special characters",
      error: "Your name must not include numbers",
    },
    {
      firstName: 123,
      description: "first name non-string type",
      error: "First name must be between 3 and 25 characters.",
    },
    {
      lastName: true,
      description: "last name non-string type",
      error: "Last name must be between 2 and 25 characters.",
    },
  ];

  it.each(invalidNames)(
    "should return 400 when name is invalid: $description",
    async ({
      firstName = validUserData.firstName,
      lastName = validUserData.lastName,
      error,
    }) => {
      const response = await request(app)
        .post("/users")
        .send({ ...validUserData, firstName, lastName });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error);
    }
  );
});

describe("UserController createUser - Join Date Validation", () => {
  const invalidJoinDates = [
    {
      joinDate: "invalid-date",
      description: "invalid date format",
      error: "The joinDate must be a valid date and not be in the future",
    },
    {
      joinDate: new Date(Date.now() + 86400000).toISOString(),
      description: "date in the future",
      error: "The joinDate must be a valid date and not be in the future",
    },
    {
      joinDate: 12345,
      description: "non-string type",
      error: "The joinDate must be a string in ISO format",
    },
  ];

  it.each(invalidJoinDates)(
    "should return 400 when joinDate is invalid: $description",
    async ({ joinDate, error }) => {
      const response = await request(app)
        .post("/users")
        .send({ ...validUserData, joinDate });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error);
    }
  );
});

describe("UserController createUser - isSupplier Validation", () => {
  const invalidIsSupplierValues = [
    {
      isSupplier: "true",
      description: "string type",
      error: "isSupplier field must be a boolean value",
    },
    {
      isSupplier: 1,
      description: "number type",
      error: "isSupplier field must be a boolean value",
    },
    {
      isSupplier: null,
      description: "null value",
      error: "isSupplier field must be a boolean value",
    },
  ];

  it.each(invalidIsSupplierValues)(
    "should return 400 when isSupplier is invalid: $description",
    async ({ isSupplier, error }) => {
      const response = await request(app)
        .post("/users")
        .send({ ...validUserData, isSupplier });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error);
    }
  );
});

it("should return 201 when user is successfully created", async () => {
  // Mock createUser to return a successful response
  UserModel.createUser = jest.fn().mockResolvedValue({
    id: 1,
    ...validUserData,
  });

  const response = await request(app).post("/users").send(validUserData);

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("username", validUserData.username);
  expect(response.body).toHaveProperty("email", validUserData.email);
});

it("should return 500 when there is an internal server error", async () => {
  // Mock createUser to simulate an internal server error
  UserModel.createUser = jest
    .fn()
    .mockRejectedValue(new Error("Failed to create user"));

  const response = await request(app).post("/users").send(validUserData);

  expect(response.status).toBe(500);
  expect(response.body.error).toBe("Failed to create user");
});

// describe("UserController createUser", () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // clear any previous mock calls before each test
//   });

//   it("should return 400 when username is invalid", async () => {
//     const response = await request(app).post("/users").send({
//       username: "ab", // Too short
//       hashedPassword: "hashedPasswordHere",
//       email: "test@example.com",
//       phoneNumber: "1234567890",
//       firstName: "John",
//       lastName: "Doe",
//       joinDate: new Date(),
//       isSupplier: true,
//     });

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe(
//       "Username must be at least 8 characters long"
//     );
//   });

//   it("should return 201 when user is successfully created", async () => {
//     // mock createUser to return a successful response
//     UserModel.createUser = jest.fn().mockResolvedValue({
//       id: 1,
//       username: "validUsername",
//       hashedPassowrd: "hashedPasswordHere",
//       email: "test@example.com",
//       phoneNumber: "1234567890",
//       firstName: "John",
//       lastName: "Doe",
//       joinDate: new Date(),
//       isSupplier: true,
//     });

//     const response = await request(app).post("/users").send({
//       username: "validUsername",
//       hashedPassword: "hashedPasswordHere",
//       email: "test@example.com",
//       phoneNumber: "1234567890",
//       firstName: "John",
//       lastName: "Doe",
//       joinDate: new Date(),
//       isSupplier: true,
//     });

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("username", "validUsername");
//     expect(response.body).toHaveProperty("email", "test@example.com");
//   });

//   it("should return 500 when there is an internal server error", async () => {
//     // Mock createUser to simulate an internal server error
//     UserModel.createUser = jest
//       .fn()
//       .mockRejectedValue(new Error("Failed to create user"));

//     const response = await request(app).post("/users").send({
//       username: "validUsername",
//       hashedPassword: "hashedPasswordHere",
//       email: "test@example.com",
//       phoneNumber: "1234567890",
//       firstName: "John",
//       lastName: "Doe",
//       joinDate: new Date(),
//       isSupplier: true,
//     });

//     expect(response.status).toBe(500);
//     expect(response.body.error).toBe("Failed to create user");
//   });
// });
