import {useState} from "react";
import Button from "../Button";
import ForumReplyMenu from "./ForumReplyMenu";
import Input from "../Input";
import useForm from "../../hooks/formHooks";

export const ForumsArticle = ({item, lang}) => {
  const [clickedItem, setClickedItem] = useState([]);
  const handleItemClick = (item) => {
    setClickedItem(item);
  };

  return clickedItem?.id == item.id ? (
    <article className="forum-article clicked-article" key={item.id}>
      <Button className="btn-smaller" onClick={() => handleItemClick(null)}>
        {String.fromCodePoint(0x274c)}
      </Button>
      <h2>{item?.title}</h2>
      <p>{item?.message}</p>
      <p>{item?.time}</p>
      <div>
        <h4>{lang("forum_page_replies")}:</h4>
        <ForumReplyMenu replies={item.replies} lang={lang} />
        <form>
          <Input type="text" onChange={() => {}} />
          <Button>{lang("forum_page_reply_button")}</Button>
        </form>
      </div>
    </article>
  ) : (
    <article
      className="forum-article"
      key={item.id}
      onClick={() => handleItemClick(item)}
    >
      <h2>{item?.title}</h2>
      <p>{item?.message}</p>
      <p>{item?.time}</p>
    </article>
  );
};

export default ForumsArticle;
