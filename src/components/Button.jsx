import {useNavigate} from "react-router-dom";
/**
 * A reusable button component. Pass props and children as normal.
 *
 * @param {CallableFunction} onClick - callback function that triggers when the button is clicked (do not pass if using to)
 * @param {string} to - URL to navigate to when the button is clicked (do not pass if using onClick)
 * @param {string} className - additional class names for styling (default: "btn")
 * @param {string} icon - icon to display in the button (optional)
 * @param {boolean} disabled - whether the button is disabled (default: false)
 * @returns
 */
const Button = ({
  onClick,
  className,
  icon,
  to,
  disabled = false,
  type,
  children,
}) => {
  const navigate = useNavigate();
  const doNavigate = () => {
    if (to) {
      navigate(to);
    }
  };
  return (
    <button
      onClick={to ? doNavigate : onClick}
      className={className ? `${className}` : "btn"}
      disabled={disabled}
      type={type ? type : "button"}
    >
      {icon && <img src={icon} alt="button icon" className="btn-icon" />}
      {children}
    </button>
  );
};

export default Button;
