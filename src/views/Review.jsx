import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";

const Review = () => {
  const {lang, setCurrentPage} = useLanguage();

  useEffect(() => {
    setCurrentPage("review_page");
  }, []);
  return (
    <>
      <div className="review-area flex-column center">
        <TextArea
          name="review"
          text={lang("title")}
          subtext={lang("limit")}
          placeholder={lang("type_here")}
        ></TextArea>
        <Input name="email" type="email" text={lang("email")}></Input>
        <Input name="rating" type="number" text={lang("rating")}></Input>
        <Button type="submit">{lang("submit_review")}</Button>
      </div>
    </>
  );
};

export default Review;
