import {useState} from "react";
import useForm from "../hooks/formHooks";
import Button from "./Button";

import EditProfile from "./EditProfile";
import Input from "./Input";
import {useUser} from "../hooks/userHooks";

const ProfileDetails = ({userDetails, lang}) => {
  const [isEditable, setIsEditable] = useState(false);
  const {putUser} = useUser();
  const token = localStorage.getItem("token");

  const submitAction = async (inputs) => {
    try {
      console.log("Updating user details:", inputs);
      await putUser(userDetails.id, inputs, token);
      alert("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details.");
    }
  };
  const {inputs, handleSubmit, handleInputChange} = useForm(submitAction, {
    username: userDetails?.name || "",
    email: userDetails?.email || "",
  });

  const handleEditClick = (e) => {
    e.preventDefault();
    if (isEditable) {
      console.log("User details: " + userDetails);
      console.log("Inputs: " + inputs);
      handleSubmit();
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  const usernameValue = inputs.username ?? userDetails?.name ?? "";
  const emailValue = inputs.email ?? userDetails?.email ?? "";

  return (
    <form className={isEditable ? "editing" : ""}>
      <Input
        name="username"
        text={lang("profile_page.username")}
        type="text"
        value={usernameValue}
        onChange={handleInputChange}
        disabled={!isEditable}
      />
      <Input
        name="email"
        text={lang("profile_page.email")}
        type="text"
        value={emailValue}
        onChange={handleInputChange}
        disabled={!isEditable}
      />
      <div className="flex-column">
        <Button className="btn-smaller" onClick={handleEditClick}>
          {isEditable
            ? lang("profile_page.save_profile")
            : lang("profile_page.edit_profile")}
        </Button>
        <Button
          className="btn-smaller"
          onClick={() => alert("Change password")}
        >
          {lang("profile_page.change_password")}
        </Button>
      </div>
    </form>
  );
};

export default ProfileDetails;

{
  /*

  /* <div className="profile-detail-row">
<span className="profile-label">{lang("profile_page.username")}</span>
<span className="profile-value">{userDetails.name}</span>
</div>
<div className="profile-detail-row">
<span className="profile-label">{lang("profile_page.email")}</span>
<span className="profile-value">{userDetails.email}</span>
</div>
<Button className="btn-smaller" onClick={() => alert("Change password")}>
{lang("profile_page.edit_profile")}
</Button>
<Button className="btn-smaller" onClick={() => alert("Change password")}>
{lang("profile_page.change_password")}
</Button> */
}
