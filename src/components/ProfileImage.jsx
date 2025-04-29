import {useState} from "react";
import useForm from "../hooks/formHooks";
import useImage from "../hooks/useImage";

const ProfileImage = ({userDetails}) => {
  const {inputs, filePreview, handleFileChange, handleFileSubmit} = useForm();
  const [imageUpdated, setImageUpdated] = useState(null);
  const imgBlobUrl = useImage(userDetails.profile_image);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFileSubmit(inputs.profileImage, userDetails.name);
    setImageUpdated(Date.now());
  };

  return (
    <div className="profile-image">
      <img
        src={imgBlobUrl || "https://placehold.co/200x250?text=No+Picture"}
        alt="Profile picture"
      />
      <form
        className="flex-column"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <div className="image-preview">
          <img
            src={filePreview}
            alt="Profile Preview"
            className="preview-image"
          />
        </div>
        <button className="btn-smaller" type="submit">
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default ProfileImage;
