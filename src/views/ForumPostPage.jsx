import {useState} from "react";
import useForum from "../hooks/useForum";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import LoadingWheel from "../components/LoadingWheel";
import Button from "../components/Button";
import Input from "../components/Input";

import ForumPostArticle from "../components/forum/ForumPostArticle";
import {useUserContext} from "../hooks/useUserContext";
import {useNavigate, useParams} from "react-router-dom";

const ForumPostPage = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();
  const {forum, setForum, loading} = useForum(currentLanguage);

  const {id} = useParams();
  const post = forum.find((item) => item.id === parseInt(id));

  const [message, setMessage] = useState("");
  const {postReplyMessage} = useForum();
  const {user} = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    postReplyMessage(message, post.id, user.username).then((res) => {
      console.log(res);
      setMessage("");
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
          <Button className="btn-smaller" onClick={() => navigate(`/forum`)}>
            {String.fromCodePoint(0x274c)}
          </Button>
          <ForumPostArticle
            item={post}
            lang={lang}
            id={id}
            post={post}
            forum={forum}
            setForum={setForum}
          />
          {/*post?.replies.map((item) => (
            <ForumPostArticle item={item} lang={lang} />
          ))*/}
          {/*
          <form onSubmit={handleSubmit} className="forum-post-form">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">{lang("forum_page_reply_button")}</Button>
          </form>
          */}
        </section>
      )}
    </>
  );
};

export default ForumPostPage;
