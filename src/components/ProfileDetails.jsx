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
      <button className="btn-smaller" onClick={() => alert("Edit profile")}>
        {lang("profile_page.edit_profile")}
      </button>
    </div>
  );
};

export default ProfileDetails;
