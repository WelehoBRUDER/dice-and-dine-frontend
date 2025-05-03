import useForum from "../hooks/useForum";
import {useLanguage} from "../context/LanguageContext";
import {useEffect, useState} from "react";
import LoadingWheel from "../components/LoadingWheel";
import Button from "../components/Button";

const Forum = () => {
  const {lang, setCurrentPage} = useLanguage();
  const {forum, loading} = useForum(lang);

  const [clickedItem, setClickedItem] = useState([]);
  const handleItemClick = (item) => {
    setClickedItem(item);
  };

  console.log("forum", forum);

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
      <h1>Forum</h1>
      {loading ? (
        <LoadingWheel />
      ) : (
        <section id="forum-section">
          {forum.map((item) =>
            clickedItem?.id == item.id ? (
              <article class="forum-article clicked-article" key={item.id}>
                <Button
                  className="btn-smaller"
                  onClick={() => handleItemClick(null)}
                >
                  {String.fromCodePoint(0x274c)}
                </Button>
                <h2>title: {item?.id}</h2>
                <p>preview: {item?.by_user_id}</p>
              </article>
            ) : (
              <article
                class="forum-article"
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <h2>title: {item?.id}</h2>
                <p>preview: {item?.by_user_id}</p>
              </article>
            )
          )}
        </section>
      )}
    </>
  );
};

export default Forum;
