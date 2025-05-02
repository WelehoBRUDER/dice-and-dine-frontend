import {useState, useEffect} from "react";
import {fetchData} from '../utils/fetchData.js';

const API_URL = import.meta.env.VITE_API_URL;

function useForum(language){
  const [forum, setFourm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForum() {
      try{
        const forum = await fetchData(`${API_URL}/forum`);
        setFourm(forum);
      }catch (error){
        console.error("Error fetching forum data:", error);
      }finally{
        setLoading(false);
      }
    }

    loadForum();
  }, [language]);

  return {forum, loading};
}

export default useForum;
