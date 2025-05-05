import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function usePostItem() {
  const token = localStorage.getItem("token");

  const postItem = async (item, language) => {
    if (item === undefined) {
      console.error("No item to post");
      return false;
    }
    const wrappedItem = {
      menu_item: {
        ...item,
        lang: language,
      },
    };

    try {
      const data = await fetchData(`${API_URL}/orders/menu`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wrappedItem),
      });

      if (data) {
        return true;
      }
    } catch (error) {
      console.error("Error posting menu item:", error);
      return false;
    }
  };

  const deleteItem = async (itemid) => {
    if (itemid === undefined) {
      console.error("No item to delete");
      return false;
    }

    try {
      const data = await fetchData(`${API_URL}/orders/${itemid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (data) {
        return true;
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
      return false;
    }
  };

  return {postItem, deleteItem};
}

export default usePostItem;
