const Button = (props) => {
  const { position, type, action, text, color } = props;
  const properties = {
    margin:"",
    textColor: "",
    borderColor: "",
    bgColor: "",
    hoverBgColor: "",
    focusRingColor: "",
    xlWidth:""
  };
  if (color === "lime") {
    properties.textColor = "white";
    properties.borderColor = "transparent";
    properties.bgColor = "lime-600";
    properties.hoverBgColor = "lime-700";
    properties.focusRingColor = "lime-500";
  } else if (color === "white") {
    properties.textColor = "gray-700";
    properties.borderColor = "gray-300";
    properties.bgColor = "white";
    properties.hoverBgColor = "gray-50";
    properties.focusRingColor = "lime-500";
  }
  if(position ==="column"){
    properties.margin = "mt-3"
    properties.xlWidth ="w-full"
  }else{
    properties.margin = "ml-3"
  }

  return (
    <button
      type={type}
      className={`${properties.margin} inline-flex items-center justify-center px-4 py-2 border border-${properties.borderColor} shadow-sm text-sm font-medium rounded-md text-${properties.textColor} bg-${properties.bgColor} hover:bg-${properties.hoverBgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${properties.focusRingColor} xl:${properties.xlWidth}`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default Button;
