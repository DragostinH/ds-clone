import getAuthUser from "@/actions/getAuthUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const authUser = await getAuthUser();

  if (!authUser) {
    throw new UploadThingError("Unauthorized");
  }

  return authUser;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // config for server image uploads
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  // config for chat message file uploads
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
