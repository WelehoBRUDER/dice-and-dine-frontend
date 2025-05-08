import {useState} from "react";
import Button from "../Button";
import ForumReplyMenu from "./ForumReplyMenu";
import TextArea from "../TextArea";
import useForum from "../../hooks/useForum";
import {useUserContext} from "../../hooks/useUserContext";

export const ForumPostArticle = ({item, lang}) => {
  const [message, setMessage] = useState("");
  const {postReplyMessage} = useForum();
  const {user} = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    postReplyMessage(message, item.id, user.username).then((res) => {
      item.replies.push(res.result);

      setMessage("");
    });
  };

  return (
    <article className="forum-article" key={item?.id}>
      <h2>{item?.title}</h2>
      <p>{item?.message}</p>
      <p>{item?.time}</p>

      <div>
        <h4>{lang("forum_page_replies")}:</h4>
        <ForumReplyMenu
          id={item.messageTableId}
          replies={item.replies}
          user={user}
          lang={lang}
        />
        <form onSubmit={handleSubmit} className="forum-post-form">
          <TextArea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit">{lang("forum_page_reply_button")}</Button>
        </form>
      </div>
    </article>
  );
};

export default ForumPostArticle;
