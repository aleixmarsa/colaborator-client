import { TrashIcon, PencilIcon } from "@heroicons/react/solid";

function Card(props) {

  const {
    title,
    cardLimitDate,
    color,
    cardId,
    setDeleteModalHasRender,
    setDeleteTaskId,
    getAllCards,
    setEditModalHasRender,
    setEditTaskId,
  } = props;

  const handleDeleteTaskBtn = (tastkId) => {
    setDeleteModalHasRender(true);
    setDeleteTaskId(cardId);
    getAllCards();
  };

  const handleEditTaskBtn = (taskId) => {
    console.log("EDIIIT")
    setEditModalHasRender(true);
    setDeleteModalHasRender(false);
    setEditTaskId(cardId);
  };

  const setColorBorder = () => {
    if (color === "white") return "border-white-300";
    if (color === "yellow") return "border-yellow-300";
    if (color === "green") return "border-green-300";
    if (color === "red") return "border-red-300";
    if (color === "orange") return "border-orange-300";
    if (color === "blue") return "border-blue-300";
    if (color === "gray") return "border-gray-300";
  };

    return (

        <li className={`col-span-1 bg-white rounded shadow-xl divide-y divide-gray-200 list-none m-2 border-2 ${setColorBorder()}`}>
            <div className="w-full flex items-center justify-between p-2 space-x-6 m-1">
                <div className="flex-1 truncate">
                    <div className="flex flex-row justify-between items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">
                            {title}
                        </h3>
                        <div className="flex flex-row justify-between items-center">

                            <button
                            type="button"
                            className="relative bg-white rounded-full focus:outline-none focus:ring-2 mr-1"
                            onClick={() => handleEditTaskBtn(cardId)}
                            >
                            <PencilIcon
                                className="text-gray-300 hover:text-gray-400 h-5 w-5"
                                aria-hidden="true"
                            />
                            </button>
                            <button
                            type="button"
                            className="relative bg-white rounded-full focus:outline-none focus:ring-2"
                            onClick={() => handleDeleteTaskBtn(cardId)}
                            >
                            <TrashIcon
                                className="text-gray-300 hover:text-gray-400 h-5 w-5"
                                aria-hidden="true"
                            />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {
            cardLimitDate && (
                <span className="text-gray-500 text-sm">Limit Date: {cardLimitDate}</span>
            ) 
        }
        </li>

  );
}

export default Card;
