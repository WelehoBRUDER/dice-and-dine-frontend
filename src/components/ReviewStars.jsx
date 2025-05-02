import {icons} from "../variables/icons";
import Button from "./Button";

const ReviewStars = ({rating, setRating}) => {
  const stars = [1, 2, 3, 4, 5];
  const {star, star_filled} = icons;

  return (
    <div className="review-stars">
      {stars.map((_star) => (
        <Button
          className={"star"}
          key={_star}
          icon={rating >= _star ? star_filled : star}
          onClick={() => {
            setRating(_star);
          }}
        ></Button>
      ))}
    </div>
  );
};

export default ReviewStars;
