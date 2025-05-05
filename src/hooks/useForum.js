import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

function useForum(language) {
  const [forum, setFourm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForum() {
      try {
        const forum = await fetchData(`${API_URL}/forum`);
        setFourm(forum);
      } catch (error) {
        console.error("Error fetching forum data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadForum();
  }, [language]);

  const postMessage = async (title, message, username) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/forum/post/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({message, title}),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newMessage = await response.json();
      return newMessage;
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const postReplyMessage = async (message, replyTo, username) => {
    const title = "";
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${API_URL}/forum/post/${replyTo}/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({message, replyTo, title}),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newMessage = await response.json();
      return newMessage;
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return {forum, loading, postMessage, postReplyMessage};
}

export default useForum;
