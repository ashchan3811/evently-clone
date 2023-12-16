"use client";

import React, { startTransition, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components//ui/input";

import { ICategory } from "@/lib/db/models/category.model";
import { createCategory, getCategories } from "@/lib/actions/category.actions";

interface DropdownProps {
  value?: string;
  onChange?: () => void;
}

const CategoryDropdown = ({ value, onChange }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getCategories().then((categories: ICategory[] | undefined) => {
      setCategories(categories || []);
    });
  }, []);

  const handleAddCategory = async () => {
    try {
      const newCategory = await createCategory({ categoryName });

      if (newCategory) {
        setCategories((current) => {
          return [...current, newCategory];
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className='w-full select-field'>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        {!!categories.length &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              className='select-item p-regular-14'
              value={category.id}
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>
            Add New Category
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type='text'
                  placeholder='Category Name'
                  className='input-field mt-3'
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  startTransition(() => {
                    handleAddCategory();
                  })
                }
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default CategoryDropdown;
