import {useLanguage} from "../context/LanguageContext";
import TextArea from "./TextArea";
import Input from "./Input";
import Button from "./Button";

const ReviewForm = ({
  handleSubmit,
  charactersLimit,
  chars,
  handleInputChange,
  inputs,
}) => {
  const {lang} = useLanguage();
  return (
    <form onSubmit={handleSubmit} className="review-area flex-column center">
      <TextArea
        name="review"
        text={lang("title")}
        subtext={charactersLimit - chars + " " + lang("limit_remain")}
        placeholder={lang("type_here")}
        value={inputs.review}
        maxLength={charactersLimit}
        onChange={handleInputChange}
      ></TextArea>
      <Input
        name="email"
        type="email"
        text={lang("email")}
        required={true}
        onChange={handleInputChange}
      ></Input>
      <Input
        name="rating"
        type="number"
        minMax={[1, 5]}
        required={true}
        text={lang("rating")}
        onChange={handleInputChange}
      ></Input>
      <Button type="submit">{lang("submit_review")}</Button>
    </form>
  );
};

export default ReviewForm;
