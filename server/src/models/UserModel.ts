import knex from "../config/database";
import { User } from "../types/userTypes";
// file for the database operations involving Users

export class UserModel {
  /**
   * Creates a new user in the database
   * @param user - Partial user object, containing user details
   * @returns The newly created user
   */
  static async createUser(user: Partial<User>): Promise<User> {
    try {
      const [newUser] = await knex("users").insert(user).returning("*");
      return newUser;
    } catch (error) {
      console.log(
        "error creating a new user, from create method in UserModel.ts: ",
        error
      );
      throw new Error("Unable to create new user");
    }
  }

  /**
   * Find a particular user, filtering by id
   * @param id - user's id (number)
   * @returns The user object if it exists, otherwise null
   */
  static async findById(id: number): Promise<User | null> {
    try {
      const user = await knex("users").where({ id }).first();
      return user;
    } catch (error) {
      console.log(
        "error finding the user by their id number, from the findById method in UserModel.ts",
        error
      );
      throw new Error(
        "Unable to find the user by the given id, double check that it is correct."
      );
    }
  }

  /**
   * Find a particular user, filtering by their email
   * @param email - users email address, string
   * @returns The user object if it exists, otherwise null
   */
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await knex("users").where({ email }).first();
      return user;
    } catch (error) {
      console.log(
        "error finding a user with that email, from the findByEmail method in UserModel.ts: ",
        error
      );
      throw new Error(
        "Unable to find the user by the given email, double check that it is correct."
      );
    }
  }

  /**
   * Update information about a user, from their id
   * @param id - user's id, number
   * @param userUpdates - partial user object, containing details about what to update
   * @returns updatedUser if updates were successful, otherwise null.
   */
  static async updateUser(
    id: number,
    userUpdates: Partial<User>
  ): Promise<User> {
    try {
      const [updatedUser] = await knex("users")
        .where({ id })
        .update(userUpdates)
        .returning("*");
      return updatedUser;
    } catch (error) {
      console.log(
        "error upating the user, from the update method in UserModel.ts",
        error
      );
      throw new Error("There was an error updating the information.");
    }
  }

  /**
   *  Delete the user from the database
   * @param id - user's id, number
   * @returns returns true if the delete was successful
   */

  static async deleteUser(id: number): Promise<number> {
    try {
      return await knex("users").where({ id }).del();
    } catch (error) {
      console.log("error from the delete method in UserModel.ts: ", error);
      throw new Error("There was an error deleting the user.");
    }
  }
}
