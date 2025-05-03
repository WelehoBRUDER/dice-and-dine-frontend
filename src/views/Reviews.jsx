import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import useReview from "../hooks/useReview";
import Button from "../components/Button";
import Review from "../components/review/Review";
import LoadingWheel from "../components/LoadingWheel";

const Reviews = () => {
  const {lang, setCurrentPage} = useLanguage();
  const {loading, reviews} = useReview();

  useEffect(() => {
    setCurrentPage("reviews_page");
  }, []);

  return (
    <div>
      <h1>{lang("title")}</h1>
      <h2>{lang("reviews")}</h2>
      <div className="reviews flex-row wrap">
        {loading ? (
          <LoadingWheel />
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
      <Button>{lang("leave_review")}</Button>
    </div>
  );
};

export default Reviews;
