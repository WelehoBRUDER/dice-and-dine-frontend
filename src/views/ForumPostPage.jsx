import useForum from "../hooks/useForum";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import LoadingWheel from "../components/LoadingWheel";
import Button from "../components/Button";

import ForumPostArticle from "../components/forum/ForumPostArticle";
import ForumPost from "../components/forum/ForumPost";
import {useNavigate, useParams} from "react-router-dom";

const ForumPostPage = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();
  const {forum, setForum, loading} = useForum(currentLanguage);

  const {id} = useParams();
  const post = forum.find((item) => item.id === parseInt(id));

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage("forum_page");
  }, []);
  return (
    <>
      <article>
        {post?.title && <title>{post.title}</title>}
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
          <ForumPost
            item={post}
            lang={lang}
            id={id}
            post={post}
            forum={forum}
            setForum={setForum}
          />
        </section>
      )}
    </>
  );
};

export default ForumPostPage;
