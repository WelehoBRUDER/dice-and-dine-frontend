import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import useReview from "../hooks/useReview";
import Button from "../components/Button";
import Review from "../components/review/Review";
import LoadingWheel from "../components/LoadingWheel";
import "../style/reviews.css";

const Reviews = () => {
  const {lang, setCurrentPage} = useLanguage();
  const {loading, reviews} = useReview();

  useEffect(() => {
    setCurrentPage("reviews_page");
  }, []);

  return (
    <>
      <article>
        <title>{lang("title")}</title>
        <meta name="description" content={lang("reviews_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>{lang("title")}</h1>
      <div className="container corner-sticky">
        <Button to="/make-review" className="btn">
          {lang("leave_review")}
        </Button>
      </div>
      <div className="reviews flex-column wrap">
        {loading ? (
          <LoadingWheel />
        ) : (
          <div className="reviews-list flex-row wrap">
            {reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
