import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

const Review = () => {
  const {lang, setCurrentPage} = useLanguage();

  useEffect(() => {
    setCurrentPage("review_page");
  }, []);
  return (
    <>
      <div className="review-area">
        <h1>{lang("title")}</h1>
        <p>{lang("limit")}</p>
        <TextArea name="review" displayLabel={false}></TextArea>
      </div>
    </>
  );
};

export default Review;
