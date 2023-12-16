import { CreateCategoryParams } from "@/types";

import { connectDb } from "@/lib/db";
import Category from "@/lib/db/models/category.model";
import { handleError } from "@/lib/utils";

export async function createCategory(category: CreateCategoryParams) {
  try {
    await connectDb();

    // const newCategory = await Category.create(category);

    // return newCategory.toObject();
  } catch (error) {
    handleError(error);
  }
}

export async function getCategories() {
  try {
    await connectDb();

    // const categories = await Category.find();

    // return categories.map((category) => category.toObject());
  } catch (error) {
    handleError(error);
  }
}
