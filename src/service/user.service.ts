import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

/**
 * Creates a new user.
 * 
 * @param input - The user input object containing user details.
 * @returns The created user object without the password field.
 * @throws Error if there is an issue creating the user.
 */
export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

/**
 * Validates a user's password.
 * 
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The user object without the password field if validation is successful, false otherwise.
 */
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

/**
 * Finds a user based on the query.
 * 
 * @param query - The filter query to find the user.
 * @returns The user object if found, null otherwise.
 */
export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

/**
 * Finds a user by email.
 * 
 * @param email - The user's email.
 * @returns The user object if found, null otherwise.
 */
export async function findUserByEmail(email: string): Promise<UserDocument | null> {
  return UserModel.findOne({ email });
}
