import {useState} from "react";
import Button from "../Button";
import ForumReplyMenu from "./ForumReplyMenu";
import Input from "../Input";
import useForum from "../../hooks/useForum";
import {useUserContext} from "../../hooks/useUserContext";

export const ForumPostArticle = ({item, lang, id, post}) => {
  const [clickedItem, setClickedItem] = useState([]);
  const handleItemClick = (item) => {
    setClickedItem(item);
  };
  const [message, setMessage] = useState("");
  const {forum, setForum, postReplyMessage} = useForum();
  const {user} = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    postReplyMessage(message, item.id, user.username).then((res) => {
      console.log("RES:", res.result);

      item.replies.push(res.result);
      //setForum([...forum, res.result]);
      setMessage("");
    });
  };

  return (
    <article className="forum-article" key={item?.id}>
      {/*
      <Button className="btn-smaller" onClick={() => handleItemClick(null)}>
        {String.fromCodePoint(0x274c)}
      </Button>
      */}
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
          <Input
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
