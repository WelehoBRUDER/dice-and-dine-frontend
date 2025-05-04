import ForumArticle from "./ForumArticle";
export const ForumReplyMenu = ({replies}) => {
  //console.log("replies", replies);
  return (
    <ul>
      {replies.map((reply) => {
        return <ForumArticle item={reply}></ForumArticle>;
      })}
    </ul>
  );
};

export default ForumReplyMenu;
