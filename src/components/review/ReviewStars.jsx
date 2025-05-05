import {icons} from "../../variables/icons";
import Button from "../Button";

/**
 * Component that displays a set of stars for rating.
 * It allows the user to select a rating from 1 to 5 by clicking on the stars.
 *
 * @param {number} rating - The current rating value (1-5).
 * @param {function} setRating - Function to update the rating value.
 * @returns
 */
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
