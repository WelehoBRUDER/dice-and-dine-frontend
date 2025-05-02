import {useLanguage} from "../context/LanguageContext";
import {useState} from "react";
import ReviewStars from "./ReviewStars";
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
  const [rating, setRating] = useState(0);
  return (
    <form
      onSubmit={handleSubmit}
      className="review-area flex-column center align"
    >
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
      {/* Bow down before my ultimate hack */}
      <input
        style={{display: "none"}}
        value={rating}
        onChange={handleInputChange}
      />
      <ReviewStars rating={rating} setRating={setRating}></ReviewStars>
      <Button type="submit">{lang("submit_review")}</Button>
    </form>
  );
};

export default ReviewForm;
