import useForum from "../hooks/useForum";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import LoadingWheel from "../components/LoadingWheel";

const Forum = () => {
  const {lang, setCurrentPage} = useLanguage();

  const {forum, loading} = useForum(lang);
  console.log("forum", forum);

  useEffect(() => {
    setCurrentPage("forum_page");
  }, []);
  return (
    <div>
      <article>
        <title>{lang("forum_title")}</title>
        <meta name="description" content={lang("forum_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>Forum</h1>
      {loading ? (
        <LoadingWheel />
      ) : (
        <section id="forum-section">
          {forum.map((item) => (
            <article class="forum-article" key={item.id}>
              <h2>1: {item?.id}</h2>
              <h2>2: {item?.by_user_id}</h2>
              <h2>3: {item?.to_message_id}</h2>
              <h2>4: {item?.message_id}</h2>
            </article>
          ))}
        </section>
      )}
      <p>This is the forum page.</p>
    </div>
  );
};

export default Forum;
