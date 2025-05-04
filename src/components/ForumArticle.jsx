import {useState} from "react";
import Button from "../components/Button";
import ForumReplyMenu from "./ForumReplyMenu";

export const ForumsArticle = ({item}) => {
  const [clickedItem, setClickedItem] = useState([]);
  const handleItemClick = (item) => {
    //console.log("item", item);
    setClickedItem(item);
  };

  return clickedItem?.id == item.id ? (
    <article className="forum-article clicked-article" key={item.id}>
      <Button className="btn-smaller" onClick={() => handleItemClick(null)}>
        {String.fromCodePoint(0x274c)}
      </Button>
      <h2>id: {item?.id}</h2>
      <p>by_user_id: {item?.by_user_id}</p>
      <ForumReplyMenu replies={item.replies}></ForumReplyMenu>
    </article>
  ) : (
    <article
      className="forum-article"
      key={item.id}
      onClick={() => handleItemClick(item)}
    >
      <h2>id: {item?.id}</h2>
      <p>by_user_id: {item?.by_user_id}</p>
    </article>
  );
};

export default ForumsArticle;
