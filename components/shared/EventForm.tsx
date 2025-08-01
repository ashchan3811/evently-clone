"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUploadThing } from "@/lib/uploadthing";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormType, eventFormSchema } from "@/lib/forms/event.form";
import { eventDefaultValues } from "@/constants";
import CategoryDropdown from "@/components/shared/CategoryDropdown";
import { Textarea } from "@/components/ui//textarea";
import FileUploader from "@/components/shared/FileUploader";
import { Checkbox } from "@/components/ui//checkbox";
import { createEvent } from "@/lib/actions/event.actions";

interface EventFormProps {
  userId: string;
  type: "Create" | "Update";
}

const EventForm = ({ userId, type }: EventFormProps) => {
  const router = useRouter();

  const [files, setFiles] = React.useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");

  const initialValues = eventDefaultValues;

  // 1. Define your form.
  const form = useForm<EventFormType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: EventFormType) => {
    const eventData = { ...values };

    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      // create event

      try {
        const newEvent = await createEvent({
          event: {
            ...eventData,
            imageUrl: uploadedImageUrl,
          },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // update event
    }
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

          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl className='h-72'>
                    <Textarea
                      placeholder='Description'
                      {...field}
                      className='textarea rounded-2xl'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <FileUploader
                      onChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                      <Image
                        src={"/assets/icons/location-grey.svg"}
                        alt='location'
                        width={24}
                        height={24}
                      />
                      <Input
                        placeholder='Event location or Online'
                        {...field}
                        className='input-field'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='startDateTime'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                      <Image
                        src={"/assets/icons/calendar.svg"}
                        alt='location'
                        width={24}
                        height={24}
                        className='filter-grey'
                      />
                      <p className='ml-3 whitespace-nowrap text-grey-600'>
                        Start Date:
                      </p>

                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        showTimeSelect
                        timeInputLabel='Time:'
                        dateFormat={"MM/dd/yyyy h:mm aa"}
                        wrapperClassName='datePicker'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='endDateTime'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                      <Image
                        src={"/assets/icons/calendar.svg"}
                        alt='location'
                        width={24}
                        height={24}
                        className='filter-grey'
                      />
                      <p className='ml-3 whitespace-nowrap text-grey-600'>
                        End Date:
                      </p>

                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        showTimeSelect
                        timeInputLabel='Time:'
                        dateFormat={"MM/dd/yyyy h:mm aa"}
                        wrapperClassName='datePicker'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                      <Image
                        src={"/assets/icons/dollar.svg"}
                        alt='dollar'
                        width={24}
                        height={24}
                        className='filter-grey'
                      />

                      <Input
                        type='number'
                        placeholder='Price'
                        {...field}
                        className='p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                      />

                      <FormField
                        control={form.control}
                        name='isFree'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className='flex items-center'>
                                <label
                                  htmlFor='isFree'
                                  className='whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                  Free Ticket
                                </label>
                                <Checkbox
                                  id='isFree'
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className='mr-2 h-5 w-5 border-2 border-primary-500'
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                      <Image
                        src={"/assets/icons/link.svg"}
                        alt='link'
                        width={24}
                        height={24}
                      />
                      <Input
                        placeholder='URL'
                        {...field}
                        className='input-field'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type='submit'
            size={"lg"}
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full'
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
