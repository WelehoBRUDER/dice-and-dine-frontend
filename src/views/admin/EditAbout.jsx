import {useLanguage} from "../../context/LanguageContext";

const About = () => {
  const {lang} = useLanguage();
  return (
    <>
      <article>
        <title>{lang("editabout_page.title")}</title>
        <meta name="description" content={lang("editabout.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div>
        <h1>Edit Restaurant Information</h1>
        <p>This page is for editing restaurant information.</p>
      </div>
    </>
  );
};

export default About;
