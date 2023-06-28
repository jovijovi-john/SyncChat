interface ButtonType {
  color?: string;
  onClick?: () => void;
  children: React.ReactNode;
  classNames?: string;
}

const Button: React.FC<ButtonType> = ({
  children,
  onClick,
  classNames,
  color,
}) => {
  return (
    <button onClick={onClick} className={`${classNames}`}>
      {children}
    </button>
  );
};

export default Button;
