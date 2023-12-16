"use server";

import { CreateCategoryParams } from "@/types";

import { connectDb } from "@/lib/db";
import Category from "@/lib/db/models/category.model";
import { handleError } from "@/lib/utils";

export async function createCategory({ categoryName }: CreateCategoryParams) {
  try {
    await connectDb();

    const newCategory = await Category.create({
      name: categoryName,
    });

    return newCategory.toJSON();
  } catch (error) {
    handleError(error);
  }
}

export async function getCategories() {
  try {
    await connectDb();

    const categories = await Category.find();

    return categories.map((category) => category.toJSON());
  } catch (error) {
    handleError(error);
  }
}
