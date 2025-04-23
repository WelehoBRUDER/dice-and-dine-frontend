import {createContext, useContext, useState, useEffect} from "react";
import en from "../lang/en.json";
import fi from "../lang/fi.json";

const languages = {en, fi};
const languageList = Object.keys(languages).map((lang) => {
  return {
    value: lang,
    label: `${languages[lang].icon} ${languages[lang].language}`,
  };
});

const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage && languages[storedLanguage]) {
      setCurrentLanguage(storedLanguage);
    } else {
      setCurrentLanguage("en"); // Default language
    }
  }, []);

  const setLanguage = (lang) => {
    if (languages[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem("language", lang);
    } else {
      console.warn(`Language ${lang} not supported`);
    }
  };

  return (
    <LanguageContext.Provider
      value={{lang: languages[currentLanguage], setLanguage, languageList}}
    >
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to use LanguageContext. Only header needs to import setter.
 * * @example const { lang } = useLanguage();
 *
 * @returns {Object} - The current language object and a function to set the language.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
