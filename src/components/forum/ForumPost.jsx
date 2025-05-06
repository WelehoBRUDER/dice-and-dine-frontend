import parseDateToTimeStamp from "../../utils/dateTime";
import {useState, useEffect} from "react";
import LoadingWheel from "../LoadingWheel";
import ForumReply from "./ForumReply";
import ForumUserInfo from "./ForumUserInfo";

export const ForumPost = ({item, lang}) => {
  console.log(item);
  const [replies, setReplies] = useState(null);

  useEffect(() => {
    if (item?.replies) {
      const gatherReplies = (replies) => {
        let allReplies = [];

        for (const reply of replies) {
          allReplies.push(reply);
          if (reply.replies && reply.replies.length > 0) {
            allReplies = allReplies.concat(gatherReplies(reply.replies));
          }
        }

        return allReplies;
      };

      const flatReplies = gatherReplies(item.replies);

      const sortedReplies = flatReplies.sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );

      setReplies(sortedReplies);
    } else {
      setReplies([]);
    }
  }, [item]);

  return (
    <article className="forum-article flex-row" key={item.id}>
      <div className="top-post">
        <div className="title">
          <h2>{item?.title}</h2>
          <ForumUserInfo item={item} lang={lang} />
          <span>{parseDateToTimeStamp(item?.time)}</span>
        </div>
        <div className="content">
          <p>{item?.message}</p>
        </div>
      </div>
      {replies && replies.length > 0 ? (
        <div className="replies">
          {replies.map((reply) => (
            <ForumReply key={reply.id} item={reply} lang={lang} />
          ))}
        </div>
      ) : (
        !replies && <LoadingWheel />
      )}
    </article>
  );
};

export default ForumPost;
