import {useState, useEffect} from "react";

// Use blob URLs to display images in a React component to rerender them
const useImage = (imagePath, refreshKey = null) => {
  const [imgBlobUrl, setImgBlobUrl] = useState("");
  const baseURL = import.meta.env.VITE_API_URL.replace(/\/api\/v1\/?$/, "");
  useEffect(() => {
    let active = true;
    let currentBlobUrl = null;

    if (imagePath) {
      const url = `${baseURL}/uploads/${imagePath}?t=${Date.now()}`;
      fetch(url, {cache: "no-store"})
        .then((res) => res.blob())
        .then((blob) => {
          if (!active) return;
          const blobUrl = URL.createObjectURL(blob);
          if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
          currentBlobUrl = blobUrl;
          setImgBlobUrl(blobUrl);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }

    return () => {
      active = false;
      if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
    };
  }, [imagePath, refreshKey]);

  return imgBlobUrl;
};

export default useImage;
