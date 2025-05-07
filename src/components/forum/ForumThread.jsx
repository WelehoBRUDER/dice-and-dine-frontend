import {Link} from "react-router-dom";
import parseDateToTimeStamp from "../../utils/dateTime";

export const ForumThread = ({item, lang}) => {
  console.log(item);
  return (
    <article className="forum-thread flex-row" key={item.id}>
      <Link to={`/forum/${item.id}`} className="forum-link flex-row center">
        <h2>{item?.title}</h2>
        {item?.replies?.length > 0 && (
          <span>
            {item.replies.length} {lang("replies")}
          </span>
        )}
      </Link>
      <span>{parseDateToTimeStamp(item?.time)}</span>
    </article>
  );
};

export default ForumThread;
