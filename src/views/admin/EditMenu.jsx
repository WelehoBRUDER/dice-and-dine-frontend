import {useEffect, useState} from "react";
import {useLanguage} from "../../context/LanguageContext";
import LoadingWheel from "../../components/LoadingWheel";
import useMenu from "../../hooks/useMenu";
import Button from "../../components/Button";
import usePostItem from "../../hooks/usePostItem";

const EditMenu = () => {
  const {setCurrentPage, lang} = useLanguage();
  const {menu: initialEnMenu, loading: enLoading} = useMenu("en");
  const {menu: initialFiMenu, loading: fiLoading} = useMenu("fi");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [enMenu, setEnMenu] = useState([]);
  const [fiMenu, setFiMenu] = useState([]);
  const {deleteItem} = usePostItem();

  const handleDelete = async (id) => {
    try {
      const success = await deleteItem(id);
      if (success) {
        const updatedEnMenu = enMenu.filter((item) => item.id !== id);
        const updatedFiMenu = fiMenu.filter((item) => item.id !== id);
        setEnMenu(updatedEnMenu);
        setFiMenu(updatedFiMenu);
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    setCurrentPage("editmenu_page");
  }, []);
  useEffect(() => {
    setEnMenu(initialEnMenu);
    setFiMenu(initialFiMenu);
  }, [initialEnMenu, initialFiMenu]);

  if (enLoading || fiLoading) {
    return <LoadingWheel />;
  }

  const bothMenus = [...enMenu, ...fiMenu];
  const categories = Array.from(
    new Set(bothMenus.flatMap((item) => item.categories || []))
  );
  const filteredMenu =
    selectedCategory === "all"
      ? bothMenus
      : bothMenus.filter((item) => item.categories?.includes(selectedCategory));
  return (
    <>
      <article>
        <title>{lang("editmenu_page.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div className="flex-column">
        <h1>{lang("editmenu_page.title")}</h1>
        <p className="admin-description">{lang("editmenu_page.description")}</p>
        <div className="delete-menu-item-table">
          <label htmlFor="categoryFilter">
            {lang("editmenu_page.filter")}:
          </label>
          <select
            className="admin-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">{lang("editmenu_page.all")}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <table className="delete-menu-item-table">
          <thead>
            <tr>
              <th>{lang("editmenu_page.itemid")}</th>
              <th>{lang("editmenu_page.name")}</th>
              <th>{lang("editmenu_page.price")}</th>
              <th>{lang("editmenu_page.category")}</th>
              <th>{lang("editmenu_page.delete")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenu.map((item) => (
              <tr key={`${item.language}-${item.id}`}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price} €</td>
                <td>{item.categories[0]}</td>
                <td>
                  <Button
                    className="delete-menu-item-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    ❌
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditMenu;
