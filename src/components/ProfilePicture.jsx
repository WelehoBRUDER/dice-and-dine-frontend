import useImage from "../hooks/useImage";

const ProfilePicture = ({imageUrl, altText, className}) => {
  const imgBlobUrl = useImage(imageUrl);
  const defaultImage = "https://placehold.co/200x250?text=No+Picture";
  return (
    <img
      src={imgBlobUrl || defaultImage}
      alt={altText}
      className={`profile-picture ${className}`}
    />
  );
};

export default ProfilePicture;
