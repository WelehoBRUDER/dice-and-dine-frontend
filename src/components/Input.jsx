/**
 * A reusable input container component, including both input and label.
 *
 * @param {String} name - name of the input field (used for the label's htmlFor attribute)
 * @param {String} text - label text
 * @param {String} type - type of the input field (e.g., text, password, email)
 * @param {String} placeholder - placeholder text for the input field
 * @param {String} value - starting value of the input field
 * @param {CallableFunction} onChange - callback function that triggers when the input value changes
 * @param {String} className - additional class names for styling (default: "input-container")
 * @returns
 */
const Input = ({name, text, type, placeholder, value, onChange, className}) => {
  return (
    <div className={`input-container ${className}`}>
      <label htmlFor={name} className="input-label">
        {text}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};
