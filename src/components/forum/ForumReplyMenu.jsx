import ForumArticle from "./ForumArticle";
export const ForumReplyMenu = ({replies, lang}) => {
  //console.log("replies", replies);
  return (
    <ul>
      {replies.map((reply) => {
        return <ForumArticle item={reply} lang={lang} />;
      })}
    </ul>
  );
};

export default ForumReplyMenu;
