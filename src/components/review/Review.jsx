import {icons} from "../../variables/icons";
import {useEffect, useState} from "react";
import useUserData from "../../hooks/useUserData";
import LoadingWheel from "../LoadingWheel";
import ReviewContent from "./ReviewContent";

/**
 * Review component that displays a review with its rating and text.
 * If it isn't anonymous it fetches the user data from the API and displays it.
 *
 * @param {Object} review - The review object containing its details.
 * @returns
 */
const Review = ({review}) => {
  const {rating, review_text} = review;
  const stars = Array.from({length: 5}, (_, index) => {
    return index < rating ? icons.star_filled : icons.star;
  });
  const {getUserById, loading} = useUserData();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (review.customer) {
      getUserById(review.customer).then((userData) => {
        setUser(userData);
      });
    }
  }, []);

  return (
    <div className="review__container">
      {loading ? (
        <LoadingWheel />
      ) : (
        <ReviewContent reviewText={review_text} user={user} stars={stars} />
      )}
    </div>
  );
};

export default Review;
