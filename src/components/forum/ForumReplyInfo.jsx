import {useState, useEffect} from "react";

export const ForumReplyInfo = ({item, lang, getMessageById}) => {
  const [reply, setReply] = useState(null);
  useEffect(() => {
    const _reply = getMessageById(item.to_message_id);
    if (_reply) {
      setReply(_reply);
    }
  }, [item, getMessageById]);

  return (
    <article className="forum-reply-message flex-row" key={item.id}>
      <p>RE: {reply?.message}</p>
    </article>
  );
};

export default ForumReplyInfo;
