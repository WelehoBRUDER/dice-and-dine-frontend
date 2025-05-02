import Input from "./Input";
import Button from "./Button";
import useForm from "../hooks/formHooks";
import {useUserContext} from "../hooks/useUserContext";
import {useNavigate} from "react-router-dom";

const Form = ({lang, authentication}) => {
  const initValues = {
    username: "",
    password: "",
    email: "",
  };
  const {handleLogin, handleRegister} = useUserContext();
  const navigate = useNavigate();

  const doLogin = async () => {
    try {
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

  const submitAction = async () => {
    try {
      if (authentication === "login") {
        const success = await doLogin(inputs); // Await the login function to ensure it's resolved
        console.log("Success:", success);
        return success; // Return true/false depending on the result
      } else if (authentication === "register") {
        await doRegister(inputs);
        return true; // Indicate success after registration
      }
    } catch (e) {
      alert(e.message); // Catch any errors and show them
      return false; // Indicate failure if an error occurs
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    submitAction,
    initValues
  );

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
      <Input
        name="password"
        text={`${lang("password_field")}`}
        type="password"
        placeholder={lang("password_field_placeholder")}
        value={inputs.password}
        onChange={handleInputChange}
      />
      {authentication === "register" && (
        <Input
          name="email"
          text={`${lang("email_field")}`}
          type="text"
          placeholder={lang("email_field_placeholder")}
          value={inputs.email}
          onChange={handleInputChange}
        />
      )}
      <Button>{lang(`${authentication}_button`)}</Button>
    </form>
  );
};

export default Form;
