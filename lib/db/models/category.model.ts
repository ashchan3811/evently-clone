import { Schema, model, models, Document, Model } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

const Category: Model<ICategory> =
  models.Category || model("Category", CategorySchema);

export default Category;
