import {useState} from "react";
import useForm from "../hooks/formHooks";
import Button from "./Button";
import Input from "./Input";
import {useUser} from "../hooks/userHooks";
import {useUserContext} from "../hooks/useUserContext";
import {useNavigate} from "react-router-dom";

const ProfileDetails = ({userDetails, lang}) => {
  const {handleLogout} = useUserContext();
  navigate = useNavigate();
  const [mode, setMode] = useState("view"); // view | edit | password

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
    password: "",
  });
  const handleEditClick = async (e) => {
    e.preventDefault();
    console.log("Edit button clicked");
    if (mode === "edit") {
      await handleSubmit();
      setMode("view");
    } else {
      setMode("edit");
    }
  };

  const handleChangePasswordClick = async (e) => {
    console.log("Change password button clicked");
    e.preventDefault();
    if (mode === "password") {
      setMode("view");
      alert("You will be logged out after changing your password.");
      await handleSubmit();
      handleLogout();
      navigate("/login");
    } else {
      setMode("password");
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setMode("view");
  };

  const usernameValue = inputs.username ?? userDetails?.name ?? "";
  const emailValue = inputs.email ?? userDetails?.email ?? "";

  return (
    <form className={mode === "edit" ? "editing" : ""}>
      {mode === "password" ? (
        <Input
          name="password"
          text={lang("profile_page.new_password")}
          type="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
      ) : (
        <>
          <Input
            name="username"
            text={lang("profile_page.username")}
            type="text"
            value={usernameValue}
            onChange={handleInputChange}
            disabled={mode !== "edit"}
          />
          <Input
            name="email"
            text={lang("profile_page.email")}
            type="text"
            value={emailValue}
            onChange={handleInputChange}
            disabled={mode !== "edit"}
          />
        </>
      )}

      <div className="flex-column">
        {mode === "view" && (
          <>
            <Button className="btn-smaller" onClick={handleEditClick}>
              {lang("profile_page.edit_profile")}
            </Button>
            <Button className="btn-smaller" onClick={handleChangePasswordClick}>
              {lang("profile_page.change_password")}
            </Button>
          </>
        )}

        {mode === "edit" && (
          <Button className="btn-smaller" onClick={handleEditClick}>
            {lang("profile_page.save_profile")}
          </Button>
        )}

        {mode === "password" && (
          <Button className="btn-smaller" onClick={handleChangePasswordClick}>
            {lang("profile_page.save_password")}
          </Button>
        )}

        {mode !== "view" && (
          <Button className="btn-smaller" onClick={handleCancelClick}>
            {lang("profile_page.cancel")}
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProfileDetails;
