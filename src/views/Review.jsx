import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import useForm from "../hooks/formHooks";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";

const Review = () => {
  const initValues = {
    review: "",
    email: "",
    rating: 0,
  };
  const {lang, setCurrentPage} = useLanguage();

  const charactersLimit = 150;
  const [chars, setChars] = useState(0);

  const submitAction = async () => {
    console.log("Review submitted:", inputs);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    submitAction,
    initValues
  );

  useEffect(() => {
    if (inputs.review.length >= charactersLimit) {
      setChars(charactersLimit);
    } else {
      setChars(inputs.review.length);
    }
  }, [inputs.review]);

  useEffect(() => {
    setCurrentPage("review_page");
  }, []);

  return (
    <>
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
    </>
  );
};

export default Review;
