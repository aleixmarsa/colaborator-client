const Button = (props) => {
  const { position, type, action, text, color } = props;

  let margin = "";
  let textColor = "";
  let borderColor = "";
  let bgColor = "";
  let hoverBgColor = "";
  let focusRingColor = "";
  let xlWidth = "";
  let sm= ""

  if (color === "mainColor") {
    textColor = "white";
    borderColor = "mainColor";
    bgColor = "bg-mainColor";
    hoverBgColor = "hover:bg-secundaryColor";
    focusRingColor = "mainColor";

  } else if (color === "white") {
    textColor = "gray-700";
    borderColor = "gray-300";
    bgColor = "bg-white";
    hoverBgColor = "hover:bg-gray-50";
    focusRingColor = "mainColor";
  }
  if (position === "column") {
    margin = "mt-3";
    xlWidth = "w-full";
    sm ="mr-3"
  } else {
    margin = "ml-3";
  }

  return (
    <button
      type={type}
      className={`${margin} inline-flex items-center justify-center px-4 py-2 border border-${borderColor} shadow-sm text-sm font-medium rounded-md text-${textColor} ${bgColor} ${hoverBgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${focusRingColor} md:${sm} ${xlWidth}`}
      onClick={action}
    >
      <span className="hover:text-hoverButton">{text}</span>
    </button>
  );
};

export default Button;
