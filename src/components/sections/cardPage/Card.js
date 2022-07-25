import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


import { useState, useEffect } from "react";

const taskStatColorChange = (stat) => {
  if (stat === "TODO") return "bg-blue-200";
  if (stat === "PROGRESS") return "bg-amber-200";
  if (stat === "DONE") return "bg-green-200";
};

function Card(props) {
  const {
    title,
    stat,
    cardLimitDate,
    color,
    cardId,
    setDeleteModalHasRender,
    setOpenDeleteModal,
    setDeleteTaskId,
    getAllCards,
    setEditModalHasRender,
    setOpenEditModal,
    setEditTaskId,
    cardIndex
  } = props;

  const handleDeleteTaskBtn = (tastkId) => {
    setDeleteModalHasRender(true);
    setOpenDeleteModal(true);
    setDeleteTaskId(cardId);
    getAllCards();
  };

  const handleEditTaskBtn = (taskId) => {
    setEditModalHasRender(true);
    setOpenEditModal(true);
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

        <li className={`col-span-1 bg-white rounded-md shadow-xl divide-y divide-gray-200 list-none m-2 border-2 ${setColorBorder()}`}>
            <div className="w-full flex items-center justify-between p-2 space-x-6 m-1">
                <div className="flex-1 truncate">
                    <div className="flex flex-row justify-between items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">
                            {title}
                        </h3>
                        <div className="flex flex-row justify-between items-center">
                            {/* <span
                                    className={`flex-shrink-0 inline-block px-2 py-0.5 mr-3 text-black-800 text-xs font-medium ${taskStatColorChange(
                                        stat
                                    )} rounded-full`}
                                    >
                                    </span> */}
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
