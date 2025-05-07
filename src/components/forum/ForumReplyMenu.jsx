import {useState} from "react";
import useForum from "../../hooks/useForum";
import Button from "../Button";

export const ForumReplyMenu = ({id, replies, user, lang}) => {
  const {postReplyMessage} = useForum();
  const [replyMessage, setReplyMessage] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleSubmit = (e, id) => {
    e.preventDefault();
    postReplyMessage(replyMessage, id, user.username).then((res) => {
      replies.push(res.result);
      setReplyMessage("");
    });
  };

  const handleReplyToggle = (replyId) => {
    setActiveReplyId((prevId) => (prevId === replyId ? null : replyId));
  };
  console.log(id);
  return (
    <ul className="forum-reply-menu">
      {replies?.map(
        (reply) => (
          console.log("id", reply.id),
          (
            <li key={reply.id} className="forum-reply-menu-item">
              <p>{reply.message}</p>

              <Button
                onClick={() => handleReplyToggle(reply.id)}
                className="btn-smaller"
              >
                {lang("forum_page_reply_button")}
              </Button>
              {activeReplyId === reply.id && (
                <form
                  onSubmit={(e) => {
                    handleSubmit(e, reply.id);
                  }}
                  className="forum-post-form"
                >
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={lang("forum_page_post_message")}
                  />
                  <Button type="submit" className="btn-smaller">
                    {lang("forum_page_post_button")}
                  </Button>
                </form>
              )}
              {reply.replies && reply.replies.length > 0 && (
                <ForumReplyMenu
                  id={reply.messageTableid}
                  replies={reply.replies}
                  user={user}
                  lang={lang}
                />
              )}
            </li>
          )
        )
      )}
    </ul>
  );
};

export default ForumReplyMenu;
