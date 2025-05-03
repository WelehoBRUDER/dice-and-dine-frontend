import {icons} from "../variables/icons";
import {useLanguage} from "../context/languageContext";
import {useUserContext} from "../hooks/useUserContext";

const Review = ({review}) => {
  const {lang} = useLanguage();
  const {rating, review_text, username} = review;
  const stars = Array.from({length: 5}, (_, index) => {
    return index < rating ? icons.star_filled : icons.star;
  });

  return (
    <div className="review">
      <div className="review__header">
        <h3>{username}</h3>
        <div className="review__stars">
          {stars.map((star, index) => (
            <img key={index} src={star} alt="star" />
          ))}
        </div>
      </div>
      <p>{review_text}</p>
    </div>
  );
};

export default Review;
