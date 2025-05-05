import {useLanguage} from "../../context/LanguageContext";
import ReviewStars from "./ReviewStars";
import TextArea from "../TextArea";
import Button from "../Button";

/**
 * Component for the review form.
 * Includes a text area for the review, a star rating system, and a submit button.
 *
 * @param {Function} handleSubmit - Function to handle the form submission.
 * @param {Number} charactersLimit - The maximum number of characters allowed in the review.
 * @param {Number} chars - The current number of characters in the review.
 * @param {Function} handleInputChange - Function to handle input changes.
 * @param {Object} inputs - The current input values.
 * @param {Number} rating - The current rating value.
 * @param {Function} setRating - Function to set the rating value.
 * @returns
 */
const ReviewForm = ({
  handleSubmit,
  charactersLimit,
  chars,
  handleInputChange,
  inputs,
  rating,
  setRating,
}) => {
  const {lang} = useLanguage();

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
      <ReviewStars rating={rating} setRating={setRating}></ReviewStars>
      <Button type="submit" disabled={inputs.review.length < 5}>
        {lang("submit_review")}
      </Button>
    </form>
  );
};

export default ReviewForm;
