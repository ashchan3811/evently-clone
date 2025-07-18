"use server";

import { revalidatePath } from "next/cache";

import { connectToDb } from "@/lib/db";
import User from "@/lib/db/models/user.model";
import Order from "@/lib/db/models/order.model";
import Event from "@/lib/db/models/event.model";
import { handleError, toJSON } from "@/lib/utils";

import { CreateUserParams, UpdateUserParams } from "@/types";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDb();

    const newUser = await User.create(user);

    return toJSON(newUser);
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDb();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return toJSON(user);
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDb();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return toJSON(updatedUser);
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDb();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? toJSON(deletedUser?.value) : null;
  } catch (error) {
    handleError(error);
  }
}
