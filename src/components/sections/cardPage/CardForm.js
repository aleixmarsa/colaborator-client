import { useState } from "react";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";
import { addNewTaskService } from "../../../services/task.services";
import { addNewActivityService } from "../../../services/activity.services";
import { SocketContext } from "../../../context/socket.context";


function CardForm(props) {

  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardState, setCardState] = useState("TODO");
  const [cardColor, setCardColor] = useState("white");
  const [cardLimitDate, setCardLimitDate] = useState("");

  const { user } = useContext(AuthContext);
  const {socket} = useContext(SocketContext);
    const {projectId, cards,setCardForm,setCards, handleCancelAddSaveFormBtn} = props

  const handleSubmitNewCard = async (e) => {
    e.preventDefault();
    const taskBody = {
      title: cardTitle,
      description: cardDescription,
      state: cardState,
      project: projectId,
      color: cardColor,
      limitDate: cardLimitDate,
    };

    const activityBody = {
      title: "Task created",
      project: projectId,
      user: user._id,
    };
    socket.emit("newActivity", activityBody);

    setCardForm(false);

    socket.emit("newTask", taskBody)
  };

  return (
    <div className="p-6 bg-white rounded-md">
      <h2 className="text-2xl">New Card</h2>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmitNewCard}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Title:
                </label>

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm ">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={(e) => setCardTitle(e.target.value)}
                      value={cardTitle}
                      className="flex-1 block w-full focus:outline focus:outline-buttonHover min-w-0 rounded-r-md sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Color:
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="color"
                    name="color"
                    className="max-w-lg block focus:outline focus:outline-buttonHover w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => setCardColor(e.target.value)}
                  >
                    <option value="white">White</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="blue">Blue</option>
                    <option value="gray">Gray</option>
                  </select>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Date Limit:
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="date"
                    name="limitDate"
                    className="max-w-lg block focus:outline focus:outline-buttonHover w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => setCardLimitDate(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 focus:outline-none focus:outline focus:outline-buttonHover"
              onClick={() => setCardForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mainColor hover:bg-secundaryColor focus:outline focus:outline-buttonHover"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardForm;
