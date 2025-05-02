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
      console.log("doLogin", inputs);
      await handleLogin(inputs);
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  };

  const doRegister = async () => {
    try {
      await handleRegister(inputs);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (e) {
      alert(e.message);
    }
  };

  const submitAction = async () => {
    console.log("submitAction", inputs);
    try {
      if (authentication === "login") {
        await doLogin(inputs);
      } else if (authentication === "register") {
        await doRegister(inputs);
      }
    } catch (e) {
      alert(e.message);
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
      <Button type="submit">{lang(`${authentication}_button`)}</Button>
    </form>
  );
};

export default Form;
