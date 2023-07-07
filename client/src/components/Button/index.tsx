interface ButtonType {
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
  classNames?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonType> = ({
  children,
  onClick,
  classNames,
  type,
}) => {
  return (
    <button type={type} onClick={onClick} className={`${classNames}`}>
      {children}
    </button>
  );
};

export default Button;
