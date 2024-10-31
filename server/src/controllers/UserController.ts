import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import argon2 from "argon2";
import { validateUser } from "../validations/userValidation";
export class UserController {
  // create a new user
  static async createUser(req: Request, res: Response) {
    // validate the input given to our endpoint
    const validationError = validateUser(req.body);
    if (validationError) {
    //   console.log(req.body);
      console.log(validationError);
      return res.status(400).json({ error: validationError });
    }

    // if the input passes the validation check, continue to create the user
    try {
      // const { username, email, password, phoneNumber, firstName, lastName, isSupplier } = req.body;
      const user = await UserModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(Number(req.params.id));
      if (user) res.status(200).json(user);
      else res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await UserModel.updateUser(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user information" });
    }
  }
}
