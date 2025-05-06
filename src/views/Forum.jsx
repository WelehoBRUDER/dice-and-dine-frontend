import {useState} from "react";
import useForum from "../hooks/useForum";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import LoadingWheel from "../components/LoadingWheel";
import Button from "../components/Button";
import Input from "../components/Input";

import ForumArticle from "../components/forum/ForumArticle";
import {useUserContext} from "../hooks/useUserContext";
import {useNavigate} from "react-router-dom";

const Forum = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();
  const {forum, setForum, loading} = useForum(currentLanguage);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const {postMessage} = useForum();
  const {user} = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    postMessage(title, message, user.username).then((res) => {
      console.log("RES:", res.result);

      res.result.id = res.result.messageTableId;
      setForum([...forum, res.result]);
      setTitle("");
      setMessage("");
      navigate("/forum");
    });
  };

  useEffect(() => {
    setCurrentPage("forum_page");
  }, []);
  return (
    <>
      <article>
        <title>{lang("forum_page_title")}</title>
        <meta name="description" content={lang("forum_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>{lang("forum_page_title")}</h1>
      {loading ? (
        <LoadingWheel />
      ) : (
        <section id="forum-section">
          {forum.map((item) => (
            <ForumArticle item={item} lang={lang} />
          ))}
          <form onSubmit={handleSubmit} className="forum-post-form">
            <h3>{lang("make a new post")}</h3>
            <Input
              text={lang("forum_page_post_title")}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              text={lang("forum_page_post_message")}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">{lang("forum_page_post_button")}</Button>
          </form>
        </section>
      )}
    </>
  );
};

export default Forum;
