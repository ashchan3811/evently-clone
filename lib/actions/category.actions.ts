"use server";

import { CreateCategoryParams } from "@/types";

import { connectDb } from "@/lib/db";
import Category from "@/lib/db/models/category.model";
import { handleError, toJSON } from "@/lib/utils";

export async function createCategory({ categoryName }: CreateCategoryParams) {
  try {
    await connectDb();

    const newCategory = await Category.create({
      name: categoryName,
    });

    return toJSON(newCategory);
  } catch (error) {
    handleError(error);
  }
}

export async function getCategories() {
  try {
    await connectDb();

    const categories = await Category.find();

    return toJSON(categories);
  } catch (error) {
    handleError(error);
  }
}
