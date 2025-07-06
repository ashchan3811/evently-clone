"use server";

import { ObjectId } from "bson";

import { connectToDb } from "@/lib/db";
import Event, { IEvent } from "@/lib/db/models/event.model";
import { handleError, toJSON } from "@/lib/utils";
import { CreateEventParams } from "@/types";
import User from "../db/models/user.model";

export async function getEventById(id: string) {
  try {
    await connectToDb();

    const event = await Event.findOne({
      _id: new ObjectId(id),
    })
      .populate({
        path: "organizer",
        select: "firstName lastName",
      })
      .populate({
        path: "category",
        select: "name",
      });

    return toJSON(event);
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function createEvent({ event, userId, path }: CreateEventParams) {
  try {
    await connectToDb();

    const organizer = await User.findOne({
      clerkId: userId,
    });

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: organizer._id,
    });

    return toJSON(newEvent);
  } catch (error) {
    handleError(error);
    return null;
  }
}
