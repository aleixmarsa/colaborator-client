import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";

import { useState, useEffect } from "react";

const taskStatColorChange = (stat) => {
  if (stat === "TODO") return "bg-blue-200";
  if (stat === "PROGRESS") return "bg-amber-200";
  if (stat === "DONE") return "bg-green-200";
};





function Card(props) {

    console.log(props)

    const { title, stat, color, cardId, setDeleteModalHasRender, 
            setOpenDeleteModal, setDeleteTaskId, getAllCards,
            setEditModalHasRender, setOpenEditModal, setEditTaskId} = props

    
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
    }

    const setColorBackground = () => {
        return `bg-${color}-100`
    }

    return (
        <li
        className={`col-span-1 ${setColorBackground()} rounded-lg shadow divide-y divide-gray-200 list-none`}
        >
        <div className="w-full flex items-center justify-between p-3 space-x-6 m-1">
            <div className="flex-1 truncate">
                <div className="flex flex-row justify-between space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                        {title}
                    </h3>
                    <div>
                    
                        <span
                        className={`flex-shrink-0 inline-block px-2 py-0.5 mr-3 text-black-800 text-xs font-medium ${taskStatColorChange(
                            stat
                        )} rounded-full`}
                        >
                        {stat}
                        </span>
                        <button
                            type="button"
                            className="relative bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                            onClick={() => handleEditTaskBtn(cardId)}
                            >
                            <PencilIcon
                                className="text-gray-300 hover:text-gray-400 h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            type="button"
                            className="relative bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                            onClick={() => handleDeleteTaskBtn(cardId)}
                            >
                            <TrashIcon
                                className="text-gray-300 hover:text-gray-400 h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    
                </div>

                <div className="m-1">
                    <img
                    className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 mb-5"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                    alt=""
                    />
                </div>
            </div>
        </div>
        </li>
    );
}

export default Card;
