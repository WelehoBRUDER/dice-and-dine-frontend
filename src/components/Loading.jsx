import {useLanguage} from "../context/LanguageContext";

function Loading() {
  const {currentLanguage} = useLanguage();

  const loadingText = currentLanguage === "en" ? "Loading..." : "Ladataan...";
  return <p>{loadingText}</p>;
}

export default Loading;
