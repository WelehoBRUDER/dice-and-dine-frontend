import ForumUserInfo from "./ForumUserInfo";
import parseDateToTimeStamp from "../../utils/dateTime";
import ForumReplyInfo from "./ForumReplyInfo";
import ForumReplyToMessage from "./ForumReplyToMessage";

export const ForumReply = ({item, lang, original, getMessageById}) => {
  console.log(item);
  return (
    <article className="forum-reply-message flex-row" key={item.id}>
      {item.to_message_id !== original && (
        <ForumReplyInfo item={item} getMessageById={getMessageById} />
      )}
      <ForumUserInfo item={item} lang={lang} />
      <p>{item.message}</p>
      <span>{parseDateToTimeStamp(item?.time)}</span>
      <ForumReplyToMessage item={item} lang={lang} />
    </article>
  );
};

export default ForumReply;
