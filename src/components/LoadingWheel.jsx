import {useLanguage} from "../context/LanguageContext";
import "../style/loading-wheel.css";

const LoadingWheel = () => {
  const {lang} = useLanguage();
  return (
    <div className="loading-wheel">
      <div className="spinner"></div>
      <span className="desc">{lang("loading_text")}</span>
    </div>
  );
};

export default LoadingWheel;
