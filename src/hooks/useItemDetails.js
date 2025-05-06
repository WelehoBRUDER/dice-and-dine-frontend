/**
 * Custom hook to fetch item details from an API.
 *
 */

import {useState, useEffect} from "react";

const useItemDetails = (itemIds) => {
  const [itemsDetails, setItemsDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setIsLoading(true);

        const items = await Promise.all(
          itemIds.map(async (itemId) => {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/info/menu/item/${itemId}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch item with ID ${itemId}`);
            }
            const itemDetails = await response.json();
            return {...itemDetails, id: itemId};
          })
        );

        setItemsDetails(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, []);

  return {itemsDetails, isLoading, error};
};

export default useItemDetails;
