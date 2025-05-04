import useForum from "../hooks/useForum";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import LoadingWheel from "../components/LoadingWheel";
import Button from "../components/Button";
import ForumArticle from "../components/ForumArticle";

const Forum = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();
  const {forum, loading} = useForum(currentLanguage);

  //console.log("forum", forum);

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
            <ForumArticle item={item} lang={lang}></ForumArticle>
          ))}
        </section>
      )}
    </>
  );
};

export default Forum;
