import {useState, useEffect} from "react";

const useImage = (imagePath, refreshKey = null) => {
  const [imgBlobUrl, setImgBlobUrl] = useState("");

  useEffect(() => {
    console.log("useEffect triggered for imagePath or refreshKey change");
    if (imagePath) {
      const url = `http://localhost:3000/uploads/${imagePath}?t=${Date.now()}`;
      fetch(url, {
        cache: "no-store",
      })
        .then((res) => res.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          setImgBlobUrl(blobUrl);
          console.log("Updated imgBlobUrl:", blobUrl);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  }, [imagePath, refreshKey]);

  return imgBlobUrl;
};

export default useImage;
