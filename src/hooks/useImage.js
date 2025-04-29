import {useState, useEffect} from "react";

const useImage = (imagePath) => {
  const [imgBlobUrl, setImgBlobUrl] = useState("");

  useEffect(() => {
    if (imagePath) {
      fetch(`http://localhost:3000/uploads/${imagePath}`, {
        cache: "no-store",
      })
        .then((res) => res.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          setImgBlobUrl(blobUrl);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  }, [imagePath]);

  return imgBlobUrl;
};

export default useImage;
