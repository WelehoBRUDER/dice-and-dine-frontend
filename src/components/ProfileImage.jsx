import {useState} from "react";
import useForm from "../hooks/formHooks";
import useImage from "../hooks/useImage";
import {useLanguage} from "../context/LanguageContext";

const ProfileImage = ({userDetails, handleImageUpload}) => {
  const {lang} = useLanguage();
  const {inputs, filePreview, handleFileChange, handleFileSubmit} = useForm();
  const [key, setKey] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFileSubmit(inputs.profileImage, userDetails.name).then(
      (newImagePath) => {
        if (newImagePath) {
          handleImageUpload(newImagePath);
          setKey(Date.now());
        }
      }
    );
  };
  const imgBlobUrl = useImage(userDetails.profile_image, key);
  //   const imgURL = `http://localhost:3000/uploads/${userDetails.profile_image}`;
  return (
    <div className="profile-image">
      <img
        key={key}
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
        {filePreview && (
          <div className="image-preview">
            <img
              src={filePreview}
              alt="Preview profile picture"
              className="preview-image"
            />
          </div>
        )}
        <button className="btn-smaller" type="submit">
          {lang("profile_page.upload_button")}
        </button>
      </form>
    </div>
  );
};

export default ProfileImage;
