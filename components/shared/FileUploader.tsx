"use client";

import React, { useCallback } from "react";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

interface FileUploaderProps {
  onChange: (value: string) => void;
  imageUrl?: string;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileUploader = ({ onChange, imageUrl, setFiles }: FileUploaderProps) => {
  const fileTypes = ["image/*"];

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      onChange(convertFileToUrl(acceptedFiles[0]));
    },
    [onChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className='flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50'
    >
      <input {...getInputProps()} className='cursor-pointer' />
      {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center '>
          <Image
            src={imageUrl}
            alt='preview'
            width={250}
            height={250}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex-center flex-col py-5 text-gray-500'>
          <Image
            src='/assets/icons/upload.svg'
            alt='file upload'
            width={77}
            height={77}
          />
          <h3 className='mb-2 mt-2'>Drag photo here</h3>
          <p className='p-medium-12 mb-4'>SVG, PNG, JPG</p>
          <Button type='button' className='rounded-full'>
            Select from Computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
