"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import Image from "next/image";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [thumbImage, setThumbImage] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const uploadSuccessHandler = (image_url: string, thumbnail_url: string) => {
    const url = image_url;

    setUploaded(true);

    setThumbImage(thumbnail_url);
    onUpload(url);
    toast.success("Image uploaded successfully");
  };

  return (
    <CldUploadWidget
      uploadPreset="next-js-blog-app"
      options={{
        sources: ["local", "url", "camera", "google_drive", "unsplash"],
        maxFileSize: 2000000,
        multiple: false,
        showPoweredBy: false,
        theme: "dark"
      }}
      onSuccess={(result: any, { widget }) => {
        uploadSuccessHandler(result?.info?.secure_url, result?.info?.thumbnail_url);
        widget.close();
      }}
    >
      {({ open, isLoading }) => (
        <>
          {isLoading ? (
            <button className="bg-blue-500 p-2 rounded-md">
              Initializing ...
            </button>
          ) : (
            <>
              {thumbImage ? (
                <Image src={thumbImage} alt="post thumbnail url" width={50} height={50} />
              ) : (
                <button
                  type="button"
                  onClick={() => open()}
                  disabled={uploaded}
                  className="bg-blue-500 p-2 rounded-md"
                >
                  Upload an image
                </button>
              )}
            </>
          )}
        </>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
