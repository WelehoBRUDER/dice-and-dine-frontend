import useForm from "../../hooks/formHooks";
import Button from "../Button";
import Input from "../Input";
import {useUser} from "../../hooks/userHooks";
import {useUserContext} from "../../hooks/useUserContext";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const ProfileDetails = ({userDetails, lang}) => {
  const {handleLogout, setUser} = useUserContext();
  const navigate = useNavigate();
  const [mode, setMode] = useState("view"); // view | edit | password
  const [errors, setErrors] = useState({});

  const {putUser} = useUser();
  const token = localStorage.getItem("token");
  const submitAction = async (inputs) => {
    const validationErrors = {};

    if (mode === "password") {
      if (!inputs.oldpassword) {
        validationErrors.oldpassword = "Old password is required.";
      }
      if (!inputs.password) {
        validationErrors.password = "New password is required.";
      }
    } else {
      if (!inputs.username) {
        validationErrors.username = "Username is required.";
      }
      if (!inputs.email) {
        validationErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        validationErrors.email = "Invalid email format.";
      }
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    try {
      const payload =
        mode === "password"
          ? {
              oldpassword: inputs.oldpassword,
              password: inputs.password,
            }
          : {
              username: inputs.username,
              email: inputs.email,
            };

      await putUser(userDetails.id, payload, token);
      return true;
    } catch (error) {
      console.error("Error updating user details:", error);
      return false;
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(submitAction, {
    username: userDetails?.name || "",
    email: userDetails?.email || "",
    oldpassword: "",
    password: "",
  });

  const handleEditClick = async (e) => {
    e.preventDefault();
    if (mode === "edit") {
      const success = await handleSubmit();
      if (success) {
        alert(lang("profile_page.updated_succesfully"));
        setMode("view");
        setUser((prev) => ({
          ...prev,
          username: inputs.username,
          email: inputs.email,
        }));
      }
    } else {
      setMode("edit");
    }
  };

  const handleChangePasswordClick = async (e) => {
    e.preventDefault();

    if (mode === "password") {
      try {
        const success = await handleSubmit();

        inputs.oldpassword = "";
        inputs.password = "";

        if (success) {
          alert(lang("profile_page.password_changed"));
          setMode("view");
          handleLogout();
          navigate("/login");
        } else {
          alert(lang("profile_page.password_error"));
        }
      } catch (error) {
        console.error("Password change failed:", error);
        alert(lang("profile_page.password_error"));
      }
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
        <>
          <Input
            name="oldpassword"
            text={lang("profile_page.old_password")}
            type="password"
            value={inputs.oldpassword}
            placeholder={lang("profile_page.old_password_placeholder")}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
          {errors.oldpassword && (
            <div className="error">{errors.oldpassword}</div>
          )}
          <Input
            name="password"
            text={lang("profile_page.new_password")}
            type="password"
            value={inputs.password}
            placeholder={lang("profile_page.new_password_placeholder")}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </>
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
          {errors.username && <div className="error">{errors.username}</div>}
          <Input
            name="email"
            text={lang("profile_page.email")}
            type="text"
            value={emailValue}
            onChange={handleInputChange}
            disabled={mode !== "edit"}
          />
          {errors.email && <div className="error">{errors.email}</div>}
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
