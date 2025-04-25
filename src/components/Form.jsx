import Input from "./Input";
import Button from "./Button";
//import {useLanguage} from "../context/LanguageContext";
//import {useEffect} from "react";

const Form = ({lang, authorisation}) => {
  return (
    <form>
      <h1>{lang(authorisation)}</h1>
      <Input
        name="username"
        text={lang("username_field")}
        type="text"
        placeholder={lang("username_field_placeholder")}
      />
      <Input
        name="password"
        text={`${lang("password_field")}`}
        type="password"
        placeholder={lang("password_field_placeholder")}
      />
      {authorisation === "register" && (
        <Input
          name="email"
          text="email_field"
          type="text"
          placeholder={lang("email_field_placeholder")}
        />
      )}
      <Button>{lang("submit_button")}</Button>
    </form>
  );
};

export default Form;
