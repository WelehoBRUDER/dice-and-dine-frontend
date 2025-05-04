import {useState, useEffect} from "react";

// Use blob URLs to display images in a React component to rerender them
const useImage = (imagePath, refreshKey = null) => {
  const [imgBlobUrl, setImgBlobUrl] = useState("");
  useEffect(() => {
    let active = true;
    let currentBlobUrl = null;

    if (imagePath) {
      const url = `http://localhost:3000/uploads/${imagePath}?t=${Date.now()}`;
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
