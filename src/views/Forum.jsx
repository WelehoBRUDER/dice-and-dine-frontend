import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

const Forum = () => {
  const {lang, setCurrentPage} = useLanguage();

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
      <p>This is the forum page.</p>
    </div>
  );
};

export default Forum;
