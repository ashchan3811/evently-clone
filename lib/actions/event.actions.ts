import { connectDb } from "../db";
import Event, { IEvent } from "../db/models/event.model";

import { Schema } from "mongoose";
import { toJSON } from "../utils";

export async function getEventById(id: string) {
  try {
    await connectDb();
    const event = await Event.findOne({
      _id: new Schema.Types.ObjectId(id),
    });

    return toJSON(event);
  } catch (error) {
    console.log(error);
    return null;
  }
}
