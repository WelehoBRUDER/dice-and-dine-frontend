const Button = ({onClick, className, icon, children}) => {
  return (
    <button onClick={onClick} className={className ? `${className}` : "btn"}>
      {icon && <img src={icon} alt="button icon" className="btn-icon" />}
      {children}
    </button>
  );
};

export default Button;
