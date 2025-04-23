import {useLanguage} from "../context/LanguageContext";

const Home = () => {
  const {lang} = useLanguage();
  return (
    <div>
      <h1>{lang.home.title}</h1>
      <p>Welcome to the homepage.</p>
    </div>
  );
};

export default Home;
