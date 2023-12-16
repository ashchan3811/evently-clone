"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormType, eventFormSchema } from "@/lib/forms/event";
import { eventDefaultValues } from "@/constants";
import CategoryDropdown from "./CategoryDropdown";

interface EventFormProps {
  userId: string;
  type: "create" | "update";
}

const EventForm = ({ userId, type }: EventFormProps) => {
  const initialValues = eventDefaultValues;

  // 1. Define your form.
  const form = useForm<EventFormType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: EventFormType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5'
        >
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      placeholder='Event title'
                      {...field}
                      className='input-field'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <CategoryDropdown {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
