import { generateComponents } from "@uploadthing/react";

import type { EventFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<EventFileRouter>();
