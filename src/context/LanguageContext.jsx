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
  const [currentPage, setCurrentPage] = useState("home");

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

  const getLocalisation = (key) => {
    const lang = languages[currentLanguage];
    if (lang) {
      if (lang[key]) {
        return lang[key];
      } else if (lang[currentPage]?.[key]) {
        return lang[currentPage][key];
      } else {
        console.warn(`Key ${key} not found in language ${currentLanguage}`);
        return key; // Fallback to the key itself if not found
      }
    }
    console.warn(`Language ${currentLanguage} not found`);
    return key; // Fallback to the key itself if language not found
  };

  return (
    <LanguageContext.Provider
      value={{
        lang: getLocalisation,
        setLanguage,
        setCurrentPage,
        languageList,
        currentLanguage,
      }}
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
