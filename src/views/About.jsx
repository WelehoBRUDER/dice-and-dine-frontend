import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";

const About = () => {
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("about_page");
  }, []);

  return (
    <div id="about-page">
      <h1>Contact information</h1>
      <ul>
        <li>{String.fromCodePoint(0x260e) + lang("id")} +1012 3456 789</li>
        <li>{String.fromCodePoint(0x2709)} demo@gmail.com</li>
        <li>
          {String.fromCodePoint(0x1f4cc)} 132 Darthmouth Street Boston,
          Massachusetts 02156 United States
        </li>
      </ul>
    </div>
  );
};

export default About;
