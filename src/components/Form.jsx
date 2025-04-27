import Input from "./Input";
import Button from "./Button";
import useForm from "../hooks/formHooks";
import {useUserContext} from "../hooks/useUserContext";
//import {useLanguage} from "../context/LanguageContext";
//import {useEffect} from "react";

const Form = ({lang, authentication}) => {
  const initValues = {
    username: "",
    password: "",
    email: "",
  };

  const {handleLogin} = useUserContext();

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
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
          text="email_field"
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
