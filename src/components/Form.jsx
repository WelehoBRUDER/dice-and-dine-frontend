import Input from "./Input";
import Button from "./Button";
import useForm from "../hooks/formHooks";
import {useUserContext} from "../hooks/useUserContext";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const Form = ({lang, authentication}) => {
  const initValues = {
    username: "",
    password: "",
    email: "",
  };
  const {handleLogin, handleRegister} = useUserContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateInputs = (inputs) => {
    const errors = {};
    if (!inputs.username) errors.username = "Username is required.";
    if (!inputs.password) errors.password = "Password is required.";
    if (authentication === "register") {
      if (!inputs.email) {
        errors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        errors.email = "Email address is invalid.";
      }
    }
    return errors;
  };

  const submitAction = async () => {
    const validationErrors = validateInputs(inputs);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    try {
      if (authentication === "login") {
        const success = await doLogin(inputs);
        return success;
      } else if (authentication === "register") {
        await doRegister(inputs);
        return true;
      }
    } catch (e) {
      alert(e.message);
      return false;
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    submitAction,
    initValues
  );

  const doLogin = async () => {
    try {
      console.log("doLogin", inputs);
      await handleLogin(inputs);
      navigate("/");
    } catch (e) {
      console.error("Login error:", e);
      alert("Login failed. Please check your credentials.");
    }
  };

  const doRegister = async () => {
    try {
      await handleRegister(inputs);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (e) {
      console.error("Registration error:", e);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{lang(authentication)}</h1>
      <Input
        name="username"
        text={lang("username_field")}
        type="text"
        placeholder={lang("username_field_placeholder")}
        value={inputs.username}
        onChange={handleInputChange}
      />
      {errors.username && <div className="error">{errors.username}</div>}
      <Input
        name="password"
        text={`${lang("password_field")}`}
        type="password"
        placeholder={lang("password_field_placeholder")}
        value={inputs.password}
        onChange={handleInputChange}
      />
      {errors.password && <div className="error">{errors.password}</div>}
      {authentication === "register" && (
        <>
          <Input
            name="email"
            text={`${lang("email_field")}`}
            type="text"
            placeholder={lang("email_field_placeholder")}
            value={inputs.email}
            onChange={handleInputChange}
          />

          {errors.email && <div className="error">{errors.email}</div>}
        </>
      )}
      <Button type="submit">{lang(`${authentication}_button`)}</Button>
    </form>
  );
};

export default Form;
