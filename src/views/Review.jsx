import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import useForm from "../hooks/formHooks";
import ReviewForm from "../components/ReviewForm";
import LoadingWheel from "../components/LoadingWheel";
import ResultWindow from "../components/ResultWindow";

const Review = () => {
  const initValues = {
    review: "",
    email: "",
    rating: 0,
  };
  const {lang, setCurrentPage} = useLanguage();

  const charactersLimit = 150;
  const [chars, setChars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitAction = async () => {
    console.log("Review submitted:", inputs);
    setLoading(true);
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
      {!loading && !submitted && (
        <ReviewForm
          handleSubmit={handleSubmit}
          charactersLimit={charactersLimit}
          chars={chars}
          handleInputChange={handleInputChange}
          inputs={inputs}
        ></ReviewForm>
      )}
      {loading && <LoadingWheel loadingText="loading_review" />}
      {submitted && (
        <ResultWindow
          success={success}
          title={success ? lang("review_submitted") : lang("review_failed")}
          desc={
            success ? lang("review_submitted_desc") : lang("review_failed_desc")
          }
        />
      )}
    </>
  );
};

export default Review;
