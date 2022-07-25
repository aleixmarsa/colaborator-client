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

  if (color === "green") {
    textColor = "white";
    borderColor = "transparent";
    bgColor = "bg-green-600";
    hoverBgColor = "hover:bg-green-700";
    focusRingColor = "green-500";

  } else if (color === "white") {
    textColor = "gray-700";
    borderColor = "gray-300";
    bgColor = "bg-white";
    hoverBgColor = "hover:bg-gray-50";
    focusRingColor = "green-500";
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
      {text}
    </button>
  );
};

export default Button;
