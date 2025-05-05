import {useEffect} from "react";
import {useLanguage} from "../../context/LanguageContext";
import useForm from "../../hooks/formHooks";
import useCategory from "../../hooks/useCategory";
import {useAllergens} from "../../hooks/useAllergens";
import LoadingWheel from "../../components/LoadingWheel";
import Input from "../../components/Input";

const AddToMenu = () => {
  const {lang, setCurrentPage, currentLanguage} = useLanguage();
  const {categories: fiCategories, loading: fiCategoriesLoading} =
    useCategory("fi");
  const {allergens: fiAllergens, loading: fiAllergensLoading} =
    useAllergens("fi");
  const {categories: enCategories, loading: enCategoriesLoading} =
    useCategory("en");
  const {allergens: enAllergens, loading: enAllergensLoading} =
    useAllergens("en");

  const mapCategoryIdsByIndex = (selectedEnIds, enCategories, fiCategories) => {
    return selectedEnIds
      .map((enId) => {
        const index = enCategories.findIndex((cat) => cat.id === enId);
        return index !== -1 ? fiCategories[index].id : null;
      })
      .filter((id) => id !== null);
  };

  const mapAllergenIdsByIndex = (selectedEnIds, enAllergens, fiAllergens) => {
    return selectedEnIds
      .map((enId) => {
        const index = enAllergens.findIndex((allergen) => allergen.id === enId);
        return index !== -1 ? fiAllergens[index].id : null;
      })
      .filter((id) => id !== null);
  };
  const onSubmit = () => {
    const fiCategoryIds = mapCategoryIdsByIndex(
      inputs.en.categories,
      enCategories,
      fiCategories
    );
    const fiAllergenIds = mapAllergenIdsByIndex(
      inputs.en.allergens,
      enAllergens,
      fiAllergens
    );

    const payload = {
      en: inputs.en,
      fi: {
        ...inputs.fi,
        categories: fiCategoryIds,
        allergens: fiAllergenIds,
      },
    };

    console.log(payload);
    // You can now post `payload` to your backend
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(onSubmit, {
    en: {name: "", price: "", categories: [], allergens: [], description: ""},
    fi: {name: "", categories: [], allergens: [], description: ""},
  });

  const handleCategoryChange = (language, e) => {
    const selectedId = Number(e.target.value);
    handleInputChange(language, {
      target: {name: "categories", value: [selectedId]},
    });
  };

  const handleAllergenChange = (language, allergenId) => {
    const allergens = inputs[language].allergens.includes(allergenId)
      ? inputs[language].allergens.filter((id) => id !== allergenId)
      : [...inputs[language].allergens, allergenId];

    handleInputChange(language, {
      target: {name: "allergens", value: allergens},
    });
  };

  useEffect(() => {
    setCurrentPage("addtomenu_page");
  }, []);

  const displayCategories =
    currentLanguage === "fi" ? fiCategories : enCategories;
  const displayAllergens = currentLanguage === "fi" ? fiAllergens : enAllergens;
  if (
    fiCategoriesLoading ||
    fiAllergensLoading ||
    enCategoriesLoading ||
    enAllergensLoading
  ) {
    return <LoadingWheel />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{lang("addtomenu_page.title")}</h1>

      {/* English form part */}
      <h2>{lang("addtomenu_page.enTitle")}</h2>
      <Input
        name="name"
        text={lang("addtomenu_page.enname")}
        type="text"
        placeholder={lang("addtomenu_page.namePlaceholder")}
        value={inputs.en.name}
        onChange={(e) => handleInputChange("en", e)}
        icon={null}
      />

      <div className="flex-column">
        <label className="admin-label">
          {lang("addtomenu_page.category")}:
        </label>
        <select
          className="admin-filter"
          value={inputs.en.categories[0] || ""}
          onChange={(e) => handleCategoryChange("en", e)}
        >
          {displayCategories.map((cat, idx) => (
            <option key={cat.id} value={enCategories[idx].id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label className="admin-label">
          {lang("addtomenu_page.allergens")}:
        </label>
        <div className="checkbox-group">
          {displayAllergens.map((allergen, idx) => (
            <label key={allergen.id}>
              <input
                type="checkbox"
                checked={inputs.en.allergens.includes(enAllergens[idx].id)}
                onChange={() => handleAllergenChange("en", enAllergens[idx].id)}
              />
              {allergen.name}
            </label>
          ))}
        </div>
      </div>
      <Input
        name="description"
        text={lang("addtomenu_page.endescription")}
        type="text"
        placeholder={lang("addtomenu_page.descriptionPlaceholder")}
        value={inputs.en.description}
        onChange={(e) => handleInputChange("en", e)}
        icon={null}
      />
      <Input
        name="price"
        text={lang("addtomenu_page.price")}
        type="number"
        placeholder={lang("addtomenu_page.pricePlaceholder")}
        value={inputs.en.price}
        onChange={(e) => handleInputChange("en", e)}
        icon={null}
      />

      {/* Finnish form part */}
      <h2>{lang("addtomenu_page.fiTitle")}</h2>
      <Input
        name="name"
        text={lang("addtomenu_page.finame")}
        type="text"
        placeholder={lang("addtomenu_page.namePlaceholder")}
        value={inputs.fi.name}
        onChange={(e) => handleInputChange("fi", e)}
        icon={null}
      />

      <Input
        name="description"
        text={lang("addtomenu_page.fidescription")}
        type="text"
        placeholder={lang("addtomenu_page.descriptionPlaceholder")}
        value={inputs.fi.description}
        onChange={(e) => handleInputChange("fi", e)}
        icon={null}
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default AddToMenu;
