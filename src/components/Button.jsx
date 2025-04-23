/**
 * A reusable button component. Pass props and children as normal.
 *
 * @param {CallableFunction} onClick - callback function that triggers when the button is clicked
 * @param {string} className - additional class names for styling (default: "btn")
 * @returns
 */
const Button = ({onClick, className, icon, children}) => {
  return (
    <button onClick={onClick} className={className ? `${className}` : "btn"}>
      {icon && <img src={icon} alt="button icon" className="btn-icon" />}
      {children}
    </button>
  );
};

export default Button;
