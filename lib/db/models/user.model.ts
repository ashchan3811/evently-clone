import { Schema, model, models, Document, Model } from "mongoose";

import { IEvent } from "@/lib/db/models/event.model";
import { IOrder } from "@/lib/db/models/order.model";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo?: string;

  events: IEvent[];
  orders: IOrder[];
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const User: Model<IUser> = models.User || model("User", UserSchema);

export default User;
