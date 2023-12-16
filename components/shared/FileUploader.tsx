"use client";

import { UploadButton } from "@/src/utils/uploadthing";
import React from "react";

interface FileUploaderProps {
  onChange?: (value: string) => void;
  imageUrl?: string;
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileUploader = ({ onChange, imageUrl, setFiles }: FileUploaderProps) => {
  return (
    <UploadButton
      endpoint={"imageUploader"}
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
      }}
    />
  );
};

export default FileUploader;
