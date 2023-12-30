import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { EventFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<EventFileRouter>();

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<EventFileRouter>();
