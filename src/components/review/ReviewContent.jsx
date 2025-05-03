import {useLanguage} from "../../context/LanguageContext";
import {icons} from "../../variables/icons";
import {useState} from "react";
import ProfilePicture from "../ProfilePicture";

const ReviewContent = ({reviewText, user, stars}) => {
  const {lang} = useLanguage();
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const TextArea = ({text}) => {
    return (
      <div
        className={`review-text ${collapsed ? "collapsed" : ""}`}
        onClick={toggleCollapse}
      >
        <p>{text.length > 150 ? text.slice(0, 150) + "..." : text}</p>
        {collapsed && (
          <span className="review-text__more">{lang("read_more")}</span>
        )}
      </div>
    );
  };

  if (user) {
    return (
      <div className="review__content">
        <div className="review__user flex-row wrap">
          <ProfilePicture
            imageUrl={user.profile_image}
            altText={user.name}
            className="review__user-image"
          />

          <h3>{user.name}</h3>
        </div>
        <div className="review__stars flex-row wrap">
          {stars.map((star, index) => (
            <img key={index} src={star} alt="star" />
          ))}
        </div>
        <TextArea text={reviewText} />
      </div>
    );
  } else {
    return (
      <div className="review__content">
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
        <TextArea text={reviewText} />
      </div>
    );
  }
};

export default ReviewContent;
