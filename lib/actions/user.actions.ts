"use server";

import { CreateUserParams } from "@/types";
import { handleError } from "@/lib/utils";
import { connectDb } from "@/lib/db";
import User, { IUser } from "@/lib/db/models/user.model";
import _ from "lodash";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectDb();

    const newUser = await User.create(user);

    return newUser.toObject();
  } catch (err) {
    handleError(err);
  }
};
