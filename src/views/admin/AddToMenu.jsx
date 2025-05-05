import {useEffect, useState} from "react";
import {useLanguage} from "../../context/LanguageContext";
import useForm from "../../hooks/formHooks";
import useCategory from "../../hooks/useCategory";
import {useAllergens} from "../../hooks/useAllergens";
import LoadingWheel from "../../components/LoadingWheel";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import usePostItem from "../../hooks/usePostItem";
import ResultWindow from "../../components/ResultWindow"; // Ensure this path is correct

const AddToMenu = () => {
  const {lang, setCurrentPage, currentLanguage} = useLanguage();
  const {postItem} = usePostItem();
  const [localLoading, setLocalLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showResult, setShowResult] = useState(false);

  const {categories: fiCategories, loading: fiCategoriesLoading} =
    useCategory("fi");
  const {allergens: fiAllergens, loading: fiAllergensLoading} =
    useAllergens("fi");
  const {categories: enCategories, loading: enCategoriesLoading} =
    useCategory("en");
  const {allergens: enAllergens, loading: enAllergensLoading} =
    useAllergens("en");

  const validateInputs = (inputs) => {
    const errors = {};
    if (!inputs.en.name) errors.enName = lang("addtomenu_page.enname_required");
    if (!inputs.en.price)
      errors.enPrice = lang("addtomenu_page.price_required");
    if (!inputs.fi.name) errors.fiName = lang("addtomenu_page.finame_required");
    if (!inputs.fi.description)
      errors.fiDescription = lang("addtomenu_page.fidescription_required");
    if (!inputs.en.description)
      errors.enDescription = lang("addtomenu_page.endescription_required");
    if (inputs.en.categories.length === 0)
      errors.enCategory = lang("addtomenu_page.category_required");

    return errors;
  };

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
  const onSubmit = async () => {
    setLocalLoading(true);
    const validationErrors = validateInputs(inputs);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLocalLoading(false);
      return;
    }
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

    const fiPayload = {
      ...inputs.fi,
      categories: fiCategoryIds,
      allergens: fiAllergenIds,
      price: inputs.en.price,
    };

    const enPayload = inputs.en;
    try {
      const fiResult = await postItem(fiPayload, "fi");
      const enResult = await postItem(enPayload, "en");

      if (fiResult && enResult) {
        resetForm();
        setShowResult(true);
      }
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const {handleSubmit, handleInputChangeMenu, inputs, resetForm} = useForm(
    onSubmit,
    {
      en: {name: "", price: "", categories: [], allergens: [], description: ""},
      fi: {name: "", categories: [], allergens: [], description: ""},
    }
  );

  const handleCategoryChange = (language, e) => {
    const selectedId = Number(e.target.value);
    handleInputChangeMenu(language, {
      target: {name: "categories", value: [selectedId]},
    });
  };

  const handleAllergenChange = (language, allergenId) => {
    const allergens = inputs[language].allergens.includes(allergenId)
      ? inputs[language].allergens.filter((id) => id !== allergenId)
      : [...inputs[language].allergens, allergenId];

    handleInputChangeMenu(language, {
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
    enAllergensLoading ||
    localLoading
  ) {
    return <LoadingWheel />;
  }

  return (
    <>
      {showResult ? (
        <ResultWindow
          success={true}
          title={lang("addtomenu_page.success_title")}
          desc={lang("addtomenu_page.success_desc")}
          continueCallback={() => setShowResult(false)} // Hide the result window and maybe redirect
        />
      ) : (
        <>
          <h1>{lang("addtomenu_page.title")}</h1>
          <form onSubmit={handleSubmit}>
            {/* English form part */}
            <Input
              name="name"
              text={lang("addtomenu_page.enname")}
              type="text"
              placeholder={lang("addtomenu_page.namePlaceholder")}
              value={inputs.en.name}
              onChange={(e) => handleInputChangeMenu("en", e)}
              icon={null}
            />
            {errors.enName && <div className="error">{errors.enName}</div>}
            <TextArea
              name="description"
              text={lang("addtomenu_page.endescription")}
              placeholder={lang("addtomenu_page.descriptionPlaceholder")}
              value={inputs.en.description}
              onChange={(e) => handleInputChangeMenu("en", e)}
            />
            {errors.enDescription && (
              <div className="error">{errors.enDescription}</div>
            )}

            {/* Finnish form part */}
            <Input
              name="name"
              text={lang("addtomenu_page.finame")}
              type="text"
              placeholder={lang("addtomenu_page.namePlaceholder")}
              value={inputs.fi.name}
              onChange={(e) => handleInputChangeMenu("fi", e)}
              icon={null}
            />
            {errors.fiName && <div className="error">{errors.fiName}</div>}

            <TextArea
              name="description"
              text={lang("addtomenu_page.fidescription")}
              placeholder={lang("addtomenu_page.descriptionPlaceholder")}
              value={inputs.fi.description}
              onChange={(e) => handleInputChangeMenu("fi", e)}
            />
            {errors.fiDescription && (
              <div className="error">{errors.fiDescription}</div>
            )}

            <div className="flex-column">
              <label className="admin-label">
                {lang("addtomenu_page.category")}:
              </label>
              <select
                className="admin-filter"
                value={inputs.en.categories[0] || ""}
                onChange={(e) => handleCategoryChange("en", e)}
              >
                <option value=""></option>
                {displayCategories.map((cat, idx) => (
                  <option key={cat.id} value={enCategories[idx].id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.enCategory && (
                <div className="error">{errors.enCategory}</div>
              )}

              <label className="admin-label">
                {lang("addtomenu_page.allergens")}:
              </label>
              <div className="checkbox-group">
                {displayAllergens.map((allergen, idx) => (
                  <label key={allergen.id}>
                    <input
                      type="checkbox"
                      checked={inputs.en.allergens.includes(
                        enAllergens[idx].id
                      )}
                      onChange={() =>
                        handleAllergenChange("en", enAllergens[idx].id)
                      }
                    />
                    {allergen.name}
                  </label>
                ))}
              </div>
            </div>
            <Input
              name="price"
              text={lang("addtomenu_page.price")}
              type="number"
              placeholder={lang("addtomenu_page.pricePlaceholder")}
              value={inputs.en.price}
              onChange={(e) => handleInputChangeMenu("en", e)}
              icon={null}
            />
            {errors.enPrice && <div className="error">{errors.enPrice}</div>}

            <button className="btn-smaller" type="submit">
              Save
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default AddToMenu;
