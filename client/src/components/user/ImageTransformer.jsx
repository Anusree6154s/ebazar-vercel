import React, { useState, useEffect } from "react";

const ImageTransformer = ({
  src,
  className,
  maxWidth = 500,
  quality = 0.7,
}) => {
  const [compressedSrc, setCompressedSrc] = useState(null);
  const [loadingState, setLoadingState] = useState("loading");

  useEffect(() => {

    const compressImage = async () => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Prevent CORS issues
      img.src = src;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Resize while keeping aspect ratio
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        // Draw image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to compressed WebP format
        const compressedDataUrl = canvas.toDataURL("image/webp", quality);
        setCompressedSrc(compressedDataUrl);
      };
    };

    compressImage();
  }, [src, maxWidth, quality]);

  if (loadingState === "error" || !src) {
    return null;
  }

  return (
    <div className={`${className} h-full`}>
      {loadingState === "loading" && (
        <div className="h-full w-full object-cover object-center bg-gray-100 animate-pulse "></div>
      )}
      <img
        src={compressedSrc || src}
        alt="Compressed"
        onLoad={() => setLoadingState("completed")}
        onError={() => setLoadingState("error")}
        className={`h-full w-full object-contain object-center transition-opacity duration-700 ${
          loadingState === "loading" ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
      />
    </div>
  );
};

export default ImageTransformer;
