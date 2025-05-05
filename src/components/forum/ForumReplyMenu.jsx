import {useState} from "react";
import useForum from "../../hooks/useForum";
import ForumPostArticle from "./ForumArticle";

export const ForumReplyMenu = ({replies, lang}) => {
  const {postReplyMessage} = useForum();
  const [replyMessage, setReplyMessage] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleReplySubmit = async (e, replyId) => {
    e.preventDefault();
    if (replyMessage.trim()) {
      await postReplyMessage(replyMessage, replyId, "currentUser"); // Replace "currentUser" with the actual username
      setReplyMessage("");
      setActiveReplyId(null);
    }
  };

  return (
    <ul>
      {replies.map((reply) => (
        <li key={reply.id}>
          <div>
            <p>{reply.message}</p>
          </div>
          {reply.replies && reply.replies.length > 0 && (
            <ForumReplyMenu replies={reply.replies} lang={lang} />
          )}
          <button onClick={() => setActiveReplyId(reply.id)}>
            {lang("forum_page_reply_button")}
          </button>
          {activeReplyId === reply.id && (
            <form onSubmit={(e) => handleReplySubmit(e, reply.id)}>
              <input
                type="text"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder={lang("forum_page_post_message")}
              />
              <button type="submit">{lang("forum_page_post_button")}</button>
            </form>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ForumReplyMenu;
