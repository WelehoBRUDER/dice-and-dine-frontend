import Input from "./Input";
import Button from "./Button";
//import {useLanguage} from "../context/LanguageContext";
//import {useEffect} from "react";

const Form = ({lang, authentication}) => {
  return (
    <form>
      <h1>{lang(authentication)}</h1>
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
      {authentication === "register" && (
        <Input
          name="email"
          text="email_field"
          type="text"
          placeholder={lang("email_field_placeholder")}
        />
      )}
      <Button>{lang(`${authentication}_button`)}</Button>
    </form>
  );
};

export default Form;
