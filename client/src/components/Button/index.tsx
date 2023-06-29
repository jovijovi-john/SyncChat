interface ButtonType {
  color?: string;
  onClick?: () => void;
  children: React.ReactNode;
  classNames?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonType> = ({
  children,
  onClick,
  classNames,
  color,
  type,
}) => {
  return (
    <button type={type} onClick={onClick} className={`${classNames}`}>
      {children}
    </button>
  );
};

export default Button;
