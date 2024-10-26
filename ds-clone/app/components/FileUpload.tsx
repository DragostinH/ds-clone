"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone, useUploadThing } from "@/lib/uploadthing";
import { FC } from "react";

import "@uploadthing/react/styles.css";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload: FC<FileUploadProps> = ({ onChange, value, endpoint }) => {
  if (value) {
    const fileType = value.split(".").pop();
    if (value && fileType !== "pdf") {
      return (
        <div className="relative h-20 w-20">
          <Image
            src={value}
            alt="Upload Image"
            fill
            className="rounded-full"
          />
          <button
            className="absolute bg-rose-500 text-white shadow-sm rounded-full p-1 top-0 right-0"
            onClick={() => onChange()}>
            <X className="h-4 w-4" />
          </button>
        </div>
      );
    }
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
};

export default FileUpload;
