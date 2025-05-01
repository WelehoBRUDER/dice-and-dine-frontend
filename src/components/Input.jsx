import {icons} from "../variables/icons";

/**
 * A reusable input container component, including both input and label.
 *
 * @param {String} name - name of the input field (used for the label's htmlFor attribute)
 * @param {String} text - label text
 * @param {String} type - type of the input field (e.g., text, password, email)
 * @param {String} placeholder - placeholder text for the input field
 * @param {String} value - starting value of the input field
 * @param {Array} minMax - array containing min and max values for number inputs (optional)
 * @param {Boolean} required - whether the input is required (default: false)
 * @param {CallableFunction} onChange - callback function that triggers when the input value changes
 * @param {String} className - additional class names for styling (default: "input-container")
 * @param {String} icon - URL of the icon to display in the input field (optional)
 * @param {Boolean} noLabel - whether to display the label (default: true)
 * @returns
 */
const Input = ({
  name,
  text,
  type,
  placeholder,
  value,
  minMax,
  required = false,
  onChange,
  className,
  icon = "user",
  displayLabel = true,
}) => {
  return (
    <div className={`input-container ${className}`}>
      {displayLabel && (
        <label htmlFor={name} className="input-label">
          {text}
        </label>
      )}
      <div className="input-and-icon flex-row">
        {icon && (
          <img src={icons[icon]} alt="input icon" className="input-icon" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          min={minMax ? minMax[0] : undefined}
          max={minMax ? minMax[1] : undefined}
          required={required}
          value={value}
          onChange={onChange}
          className="input-field"
        />
      </div>
    </div>
  );
};

export default Input;
