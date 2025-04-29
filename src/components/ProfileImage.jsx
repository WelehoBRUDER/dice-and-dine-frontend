import useForm from "../hooks/formHooks";

const ProfileImage = ({userDetails}) => {
  const {inputs, filePreview, handleFileChange, handleFileSubmit} = useForm();
  //   const [refreshImage, setRefreshImage] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFileSubmit(inputs.profileImage, userDetails.name);
    // setRefreshImage(Date.now());
  };
  //   const imgBlobUrl = useImage(userDetails.profile_image, refreshImage);
  const imgURL = `http://localhost:3000/uploads/${userDetails.profile_image}`;
  return (
    <div className="profile-image">
      <img
        src={imgURL || "https://placehold.co/200x250?text=No+Picture"}
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
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default ProfileImage;
