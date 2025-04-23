import {useLanguage} from "../context/LanguageContext";

/**
 * Select element with dropdown for language selection. No props because there is nothing to pass in.
 * * @returns {JSX.Element} - A select element with options for language selection.
 */
const LanguageSelect = () => {
  const {lang, setLanguage, languageList} = useLanguage();

  return (
    <select
      className="language-select"
      onChange={(e) => setLanguage(e.target.value)}
      defaultValue={lang.language}
    >
      {languageList.map((language) => (
        <option key={language.value} value={language.value}>
          {language.label}
        </option>
      ))}
    </select>
  );
};
export default LanguageSelect;
