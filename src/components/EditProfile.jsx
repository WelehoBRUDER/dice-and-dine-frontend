import React from "react";
import Input from "./Input";
import Button from "./Button";
import useForm from "../hooks/formHooks";
import {useLanguage} from "../context/LanguageContext";

export default function EditProfile({initialValues, onSubmit}) {
  const {lang} = useLanguage();
  const {inputs, handleInputChange, handleSubmit} = useForm(
    onSubmit,
    initialValues
  );

  return (
    <form onSubmit={handleSubmit} className="flex-column">
      <div className="profile-detail-row">
        <Input
          name="username"
          text={lang("profile_page.username")}
          type="text"
          placeholder={lang("profile_page.username_placeholder")}
          value={inputs.name}
          onChange={handleInputChange}
          className="profile-value"
        />
      </div>
      <div className="profile-detail-row">
        <label>Email:</label>
        <Input
          name="email"
          value={inputs.email}
          onChange={handleInputChange}
          className="profile-value"
        />
      </div>
      <Button type="submit" className="btn-smaller">
        Save
      </Button>
    </form>
  );
}
