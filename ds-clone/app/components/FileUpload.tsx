"use client";

import { useEdgeStore } from "@/app/libs/edgestore";
import { FC, useState } from "react";
import { SingleImageDropzone } from "./SingeImageDropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FileUploadProps {
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload: FC<FileUploadProps> = ({ value, onChange }) => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string>();
  const [progress, setProgress] = useState<number>(0);

  // if we already have a file from the form and want to edit it
  // if (value && !url) {
  //   return (
  //     <div className="">
  //       <Image
  //         className="rounded-full"
  //         src={url || value}
  //         width={200}
  //         height={200}
  //         alt="file"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div>
      <SingleImageDropzone
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 5, // 5MB
          onDropAccepted: (acceptedFiles) => {
            toast.success("File accepted");
          },
        }}
        width={200}
        height={200}
        value={file || value}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <Button
        type="button"
        variant="primary"
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
                if (progress === 100) {
                  toast.success("Server Picture Uploaded");
                }
              },
            });
            onChange(res.url);
            setUrl(res.url);
          }
        }}>
        Upload
      </Button>
      <Progress
        className={cn("mt-2 bg-primary-900 ", !progress && "hidden")}
        value={progress}
      />
    </div>
  );
};

export default FileUpload;
