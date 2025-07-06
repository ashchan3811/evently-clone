import React from "react";

import { getEventById } from "@/lib/actions/event.actions";
import { IEventDetailParams } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";

const EventDetailPage = async ({ params }: IEventDetailParams) => {
  const event = await getEventById(params.id);

  if (!event) {
    return redirect("/events");
  }

  return (
    <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
      <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
        <Image
          src={event?.imageUrl!}
          alt='event image'
          width={1000}
          height={1000}
          className='h-full min-h-[300px] object-cover object-center'
        />
      </div>
    </section>
  );
};

export default EventDetailPage;
