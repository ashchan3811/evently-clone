"use client";

import React from "react";

interface EventFormProps {
  userId: string;
  type: "create" | "update";
}

const EventForm = ({ userId, type }: EventFormProps) => {
  return (
    <div>
      EventForm - {type} - {userId}
    </div>
  );
};

export default EventForm;
