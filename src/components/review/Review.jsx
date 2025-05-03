import {icons} from "../../variables/icons";
import {useEffect, useState} from "react";
import useUserData from "../../hooks/useUserData";
import LoadingWheel from "../LoadingWheel";
import ReviewContent from "./ReviewContent";

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
