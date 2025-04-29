import {useLanguage} from "../context/LanguageContext";
import "../style/loading-wheel.css";

/**
 *
 * @param {String} loadingText - The key of the text to display while loading. The default is "loading_text".
 * @returns
 */
const LoadingWheel = ({loadingText = "loading_text"}) => {
  const {lang} = useLanguage();
  return (
    <div className="loading-wheel">
      <div className="spinner">
        <div className="block"></div>
      </div>
      <span className="desc">{lang(loadingText)}</span>
    </div>
  );
};

export default LoadingWheel;
