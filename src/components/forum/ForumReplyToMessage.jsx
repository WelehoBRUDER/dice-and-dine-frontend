import Button from "../Button";
import {icons} from "../../variables/icons";
import {useState} from "react";
import TextArea from "../TextArea";
import useForum from "../../hooks/useForum";
import {useUserContext} from "../../hooks/useUserContext";

const ForumReplyToMessage = ({item, lang}) => {
  const [showReply, setShowReply] = useState(false);
  const [message, setMessage] = useState("");
  const {postReplyMessage} = useForum();
  const {user} = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    postReplyMessage(message, item.id, user.username).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="reply-to-message">
      <Button
        className="btn-smaller"
        icon={icons.reply}
        title={lang("reply_to_message")}
        onClick={() => setShowReply(true)}
      ></Button>
      {showReply && (
        <form onSubmit={handleSubmit}>
          <TextArea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            noLabel={true}
          />
          <Button className="btn-smaller" type="submit">
            {lang("reply_to_message")}
          </Button>
          <Button className="btn-smaller" onClick={() => setShowReply(false)}>
            {lang("cancel")}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForumReplyToMessage;
