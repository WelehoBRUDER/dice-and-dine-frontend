import {useLanguage} from "../../context/LanguageContext";
import {useState} from "react";
import ReviewStars from "./ReviewStars";
import TextArea from "../TextArea";
import Button from "../Button";

const ReviewForm = ({
  handleSubmit,
  charactersLimit,
  chars,
  handleInputChange,
  inputs,
}) => {
  const {lang} = useLanguage();
  const [rating, setRating] = useState(inputs.rating);

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
      {/* Bow down before my ultimate hack */}
      <input
        style={{display: "none"}}
        value={rating}
        onChange={handleInputChange}
      />
      <ReviewStars rating={rating} setRating={setRating}></ReviewStars>
      <Button type="submit" disabled={inputs.review.length < 5}>
        {lang("submit_review")}
      </Button>
    </form>
  );
};

export default ReviewForm;
