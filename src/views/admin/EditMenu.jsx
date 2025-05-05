import {useEffect, useState} from "react";
import {useLanguage} from "../../context/LanguageContext";
import LoadingWheel from "../../components/LoadingWheel";
import useMenu from "../../hooks/useMenu";
import Button from "../../components/Button";

const EditMenu = () => {
  const {setCurrentPage, lang} = useLanguage();
  const {menu: enMenu, loading: enLoading} = useMenu("en");
  const {menu: fiMenu, loading: fiLoading} = useMenu("fi");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleDelete = async (id) => {
    console.log("Deleting item with ID:", id);
  };

  useEffect(() => {
    setCurrentPage("editmenu_page");
  }, []);

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
    <div>
      <h1>{lang("editmenu_page.title")}</h1>
      <div>
        <label htmlFor="categoryFilter">{lang("editmenu_page.filter")}:</label>
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
      <table>
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
  );
};

export default EditMenu;
