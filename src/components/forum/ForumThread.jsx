import {Link} from "react-router-dom";
import parseDateToTimeStamp from "../../utils/dateTime";

export const ForumThread = ({item}) => {
  console.log(item);
  return (
    <article className="forum-article flex-row" key={item.id}>
      <Link to={`/forum/${item.id}`} className="forum-link">
        <h2>{item?.title}</h2>
      </Link>
      <span>{parseDateToTimeStamp(item?.time)}</span>
    </article>
  );
};

export default ForumThread;
