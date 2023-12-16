import { Schema, model, models, Document, Model } from "mongoose";

import { ICategory } from "./category.model";
import { IUser } from "./user.model";

export interface IEvent extends Document {
  _id: string;

  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;

  startDateTime: Date;
  endDateTime: Date;

  print?: number;
  isFree: boolean;

  url?: string;

  category: ICategory;
  organizer: IUser;
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },

  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },

  print: { type: Number },
  isFree: { type: Boolean, default: false },

  url: { type: String },

  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event: Model<IEvent> = models.Event || model("Event", EventSchema);

export default Event;
