const Button = ({
  children,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`w-full bg-blue-500 font-semibold hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;