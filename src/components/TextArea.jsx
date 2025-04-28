/**
 * A reusable textarea container component, including both textarea and label.
 *
 * @param {String} name - name of the textarea field (used for the label's htmlFor attribute)
 * @param {String} text - label text
 * @param {String} placeholder - placeholder text for the textarea field
 * @param {String} value - starting value of the textarea field
 * @param {CallableFunction} onChange - callback function that triggers when the input value changes
 * @param {String} className - additional class names for styling (default: "input-container")
 * @param {Boolean} noLabel - whether to display the label (default: true)
 * @returns
 */
const TextArea = ({
  name,
  text,
  placeholder,
  value,
  onChange,
  className,
  displayLabel = true,
}) => {
  return (
    <div className={`input-container ${className}`}>
      {displayLabel && (
        <label htmlFor={name} className="input-label">
          {text}
        </label>
      )}
      <div className="textarea">
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="textarea-field"
          resize
        />
      </div>
    </div>
  );
};

export default TextArea;
