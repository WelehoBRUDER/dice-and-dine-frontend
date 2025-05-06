import {Link} from "react-router-dom";
import ForumUserInfo from "./ForumUserInfo";
import parseDateToTimeStamp from "../../utils/dateTime";

export const ForumReply = ({item, lang}) => {
  console.log(item);
  return (
    <article className="forum-reply-message flex-row" key={item.id}>
      <ForumUserInfo item={item} lang={lang} />
      <p>{item.message}</p>
      <span>{parseDateToTimeStamp(item?.time)}</span>
    </article>
  );
};

export default ForumReply;
