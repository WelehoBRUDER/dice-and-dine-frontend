import {useLanguage} from "../context/LanguageContext";
import Button from "./Button";

/**
 * Component that shows a result window with a title, description and a button to continue or try again.
 * This is used for showing the result of an action, such as a successful order or a failed order.
 *
 * @param {boolean} success - if the result is a success or not
 * @param {string} title - title of the result window (should come through lang())
 * @param {string} desc - description of the result window (should come through lang())
 * @param {CallableFunction} continueCallback - callback function that triggers when the user clicks the continue button (only for success) (leave empty if not needed)
 * @param {CallableFunction} tryAgainCallback - callback function that triggers when the user clicks the try again button (only for failure) (leave empty if not needed)
 * @returns
 */
const ResultWindow = ({
  success = true,
  title = "_",
  desc = "_",
  continueCallback,
  tryAgainCallback,
}) => {
  const {lang} = useLanguage();
  if (!success) {
    return (
      <div className="result-window error flex-column center">
        <h2>{title}</h2>
        <p className="large-marker error">X</p>
        <p>{desc}</p>
        {tryAgainCallback && (
          <Button onClick={tryAgainCallback}>{lang("try_again")}</Button>
        )}
      </div>
    );
  }
  return (
    <div className="result-window success flex-column center">
      <h2>{title}</h2>
      <p className="large-marker success">✓</p>
      <p>{desc}</p>
      {continueCallback && (
        <Button onClick={continueCallback}>{lang("continue")}</Button>
      )}
    </div>
  );
};

// Give me a checkmark unicode/emo ✓

export default ResultWindow;
