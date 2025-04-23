import {useLanguage} from "../context/LanguageContext";
import LanguageSelect from "../components/LanguageSelect";

const Home = () => {
  const {lang} = useLanguage();
  return (
    <div>
      <h1>{lang.home_page.title}</h1>
      <p>{lang.home_page.subtitle}</p>
      <LanguageSelect />
    </div>
  );
};

export default Home;
