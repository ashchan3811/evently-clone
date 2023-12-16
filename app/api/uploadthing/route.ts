import { createNextRouteHandler } from "uploadthing/next";

import { eventFilesRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: eventFilesRouter,
});
