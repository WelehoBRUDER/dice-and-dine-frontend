# Dice & Dine Frontend

## How to run
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
   ```bash
   npm install
   ```
4. Start the development server
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`

## How to use localization
- Import **useLanguage** from **LanguageContext**.
   ```
   import { useLanguage } from '../context/LanguageContext';
   ```
- Create **lang** and **setCurrentPage** states from the context, placing them in a **useEffect** hook.  
In the same hook, set the current page using **setCurrentPage**. It should correspond to the page name in the localization files.
   ```
   const { lang, setCurrentPage } = useLanguage();
   useEffect(() => {
       setCurrentPage('pageName');
   }, []);
   ```
- Use the **lang** state to access the localization strings. For example:
   ```
   <h1>{lang("title")}</h1>
   <p>{lang("description")}</p>
   ```
   If the key is not found in the localization file, it will return the key itself. This way, you can easily identify missing translations.  
   The **lang** function automatically looks inside the current page's localization, and as a fallback, it checks the root of the localization files.
- The localization files are located in **src/lang**. Languages are named after their code (e.g., **en.json**, **fi.json**).  
They are structured as follows:
   ```
   {
      "id": "en",
      "language": "English",
      "icon": "🇬🇧",
       "pageName": {
           "key": "value"
       }
   }
   ```
- The **id** is used to identify the language, the **language** is the name of the language, and the **icon** is the flag emoji representing the language.  
This level is the "root" of the localization file. It can be used for common strings that are used across multiple pages.

### Attributions
- Hero image from [Unsplash](https://unsplash.com/photos/a-man-sitting-at-a-table-playing-a-board-game-7gagNAbWocg?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash)