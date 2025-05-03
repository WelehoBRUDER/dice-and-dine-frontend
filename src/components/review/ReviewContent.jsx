import {useLanguage} from "../../context/LanguageContext";
import {icons} from "../../variables/icons";

const ReviewContent = ({review_text, user, stars}) => {
  const {lang} = useLanguage();
  if (user) {
    console.log(user);
    return (
      <div className="review__content flex-row wrap">
        <div className="review__user flex-row wrap">
          <img
            src={user.profile_image ? user.profile_image : icons.user}
            alt={user.name}
            className="review__user-image"
          />

          <h3>{user.name}</h3>
        </div>
        <div className="review__stars flex-row wrap">
          {stars.map((star, index) => (
            <img key={index} src={star} alt="star" />
          ))}
        </div>
        <p>{review_text}</p>
      </div>
    );
  } else {
    return (
      <div className="review__content flex-row wrap">
        <div className="review__user flex-row wrap">
          <img
            src={icons.user}
            alt={lang("profile_page.default_profile_image")}
            className="review__user-image"
          />
          <h3>{lang("anon")}</h3>
        </div>
        <div className="review__stars flex-row wrap">
          {stars.map((star, index) => (
            <img key={index} src={star} alt="star" />
          ))}
        </div>
        <p>{review_text}</p>
      </div>
    );
  }
};

export default ReviewContent;
