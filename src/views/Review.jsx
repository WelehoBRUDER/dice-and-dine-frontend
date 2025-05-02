import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import {useNavigate} from "react-router-dom";
import useReview from "../hooks/useReview";
import useForm from "../hooks/formHooks";
import ReviewForm from "../components/ReviewForm";
import LoadingWheel from "../components/LoadingWheel";
import ResultWindow from "../components/ResultWindow";

const Review = () => {
  const initValues = {
    review: "",
    rating: 3,
  };
  const {lang, setCurrentPage} = useLanguage();
  const navigate = useNavigate();

  const charactersLimit = 150;
  const [chars, setChars] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const {loading, submitReview, submitAnonymousReview} = useReview();

  const submitAction = async () => {
    const response = await submitAnonymousReview(inputs);
    setSubmitted(true);
    if (response?.id) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
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
      <article>
        <title>{lang("review_title")}</title>
        <meta name="description" content={lang("review_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
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
          continueCallback={() => {
            navigate("/");
          }}
          tryAgainCallback={() => {
            setSubmitted(false);
            setSuccess(false);
          }}
        />
      )}
    </>
  );
};

export default Review;
