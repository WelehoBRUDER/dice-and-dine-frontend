import Button from "./Button";

const ProfileDetails = ({userDetails, lang}) => {
  return (
    <div className="flex-column">
      <div className="profile-detail-row">
        <span className="profile-label">{lang("profile_page.username")}</span>
        <span className="profile-value">{userDetails.name}</span>
      </div>
      <div className="profile-detail-row">
        <span className="profile-label">{lang("profile_page.email")}</span>
        <span className="profile-value">{userDetails.email}</span>
      </div>
      <Button className="btn-smaller" onClick={() => alert("Edit profile")}>
        {lang("profile_page.edit_profile")}
      </Button>
      <Button className="btn-smaller" onClick={() => alert("Change password")}>
        {lang("profile_page.change_password")}
      </Button>
    </div>
  );
};

export default ProfileDetails;
