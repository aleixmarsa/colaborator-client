/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/outline";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  getAllTasksService,
  updateTaskStateService,
} from "../services/task.services";
import Card from "../components/sections/cardPage/Card";
import CardForm from "../components/sections/cardPage/CardForm";
import NavBar from "../components/navbar/NavBar";
import DeleteTaskModal from "../components/modals/DeleteTaskModal";
import EditTaskModal from "../components/modals/EditTaskModal";
import LateralBar from "../components/sections/LateralBar";
import { SocketContext } from "../context/socket.context";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
const API_URL = process.env.REACT_APP_API_URL;

function ProjectCards(props) {
  const params = useParams();
  const projectId = params.projectId;
  const [cardForm, setCardForm] = useState(false);
  const [deleteModalHasRender, setDeleteModalHasRender] = useState(false);
  const [editModalHasRender, setEditModalHasRender] = useState(false);
  const [createModalHasRender, setCreateModalHasRender] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(true);
  const [deleteTaskId, setDeleteTaskId] = useState("");
  const [editTaskId, seteditTaskId] = useState("");
  const [cards, setCards] = useState([]);
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(true);

  const updateTaskState = async (cardId, destination) => {
    const taskBody = {
      taskId: cardId,
      state: destination,
      project: projectId,
    };
    socket.emit("updateTaskState", taskBody);
  };

  const getTasksByProjectListener = (allTasks) => {
    setCards([...allTasks]);
    setLoading(false);
  };

  const newTaskListener = (task) => {
    socket.emit("getTasksByProject", projectId);
    setCreateModalHasRender(false);
  };

  const taskUpdatedListener = (updatedTask) => {
    setEditModalHasRender(false);
    socket.emit("getTasksByProject", projectId);
  };

  const taskDeletedListener = (taskId) => {
    setDeleteModalHasRender(false);
    socket.emit("getTasksByProject", projectId);
  };

  useEffect(() => {
    socket.on("getTasksByProject", getTasksByProjectListener);
    socket.on("newTaskCreated", newTaskListener);
    socket.on("taskUpdated", taskUpdatedListener);
    socket.on("taskDeleted", taskDeletedListener);
    return () => {
      socket.off("getTasksByProject", getTasksByProjectListener);
      socket.off("newTaskCreated", newTaskListener);
      socket.off("taskUpdated", taskUpdatedListener);
      socket.off("taskDeleted", taskDeletedListener);
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("getTasksByProject", projectId);
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const updateCards = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      let upCard = cards.find((card) => card._id === result.draggableId);
      const state = destination.droppableId.toUpperCase();
      const cardCopy = { ...upCard, state };
      const newSetCards = cards.map((card) => {
        if (card._id === cardCopy._id) {
          return cardCopy;
        } else {
          return card;
        }
      });
      setCards(newSetCards);
      updateTaskState(result.draggableId, destination.droppableId);
    }
    setCards((prevTasks) =>
      reorder(prevTasks, source.index, destination.index)
    );
  };
  return (
    <>
      <div className="h-screen">
        <NavBar />
        {deleteModalHasRender && (
          <DeleteTaskModal
            projectId={projectId}
            setDeleteModalHasRender={setDeleteModalHasRender}
            deleteModalHasRender={deleteModalHasRender}
            deleteTaskId={deleteTaskId}
          />
        )}
        {editModalHasRender && (
          <EditTaskModal
            projectId={projectId}
            setEditModalHasRender={setEditModalHasRender}
            editModalHasRender={editModalHasRender}
            editTaskId={editTaskId}
          />
        )}
        {createModalHasRender && (
          <CreateTaskModal
            projectId={projectId}
            setCreateModalHasRender={setCreateModalHasRender}
            createModalHasRender={createModalHasRender}
          />
        )}
        <div className="flex flex-row h-[calc(100vh-64px)] bg-neutral-50">
          <LateralBar projectId={projectId} />
          {!loading ? (
            <DragDropContext onDragEnd={(result) => updateCards(result)}>
              <div className=" container  mx-auto mt-2">
                <div className="drop-shadow-lg grid  grid-cols-1 ml-5 mr-5 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-5 mb-10 ">
                  <Droppable droppableId="todo">
                    {(droppableProvided) => (
                      <div className="p-6 pt-2 bg-white border border-black">
                        <div className=" border-b-2 mb-2 pb-2">
                          <h2 className="text-xl border-color-black">TO-DO</h2>
                        </div>
                        <div
                          {...droppableProvided.droppableProps}
                          ref={droppableProvided.innerRef}
                          className=""
                        >
                          <button
                            onClick={() => setCreateModalHasRender(true)}
                            type="button"
                            className="inline-flex items-center p-1 border-2 border-mainColor rounded-full shadow-sm text-mainColor hover:bg-mainColor hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                          >
                            <PlusSmIconSolid
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                          {cards.map((card, index) => {
                            if (
                              card.state === "TODO" &&
                              card.project === projectId
                            ) {
                              return (
                                <Draggable
                                  key={card._id}
                                  draggableId={card._id}
                                  index={index}
                                >
                                  {(draggableProvided, snapshot) => {
                                    if (snapshot.isDragging) {
                                      draggableProvided.draggableProps.style.left =
                                        undefined;
                                      draggableProvided.draggableProps.style.top =
                                        undefined;
                                    }
                                    return (
                                      <div
                                        {...draggableProvided.draggableProps}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.dragHandleProps}
                                        className="static"
                                      >
                                        <Card
                                          title={card.title}
                                          description={card.description}
                                          state={card.state}
                                          color={card.color}
                                          cardId={card._id}
                                          cardLimitDate={card.limitDate}
                                          setDeleteModalHasRender={
                                            setDeleteModalHasRender
                                          }
                                          setDeleteTaskId={setDeleteTaskId}
                                          setEditModalHasRender={
                                            setEditModalHasRender
                                          }
                                          setEditTaskId={seteditTaskId}
                                          cardIndex={index}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            }
                          })}
                        </div>
                        {droppableProvided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <Droppable droppableId="progress">
                    {(droppableProvided) => (
                      <div className="p-6 pt-2 bg-white border border-black">
                        <div className=" border-b-2 mb-5  pb-2  ">
                          <h2 className="text-xl  border-color-black">
                            IN PROGRESS
                          </h2>
                        </div>
                        <div
                          {...droppableProvided.droppableProps}
                          ref={droppableProvided.innerRef}
                          className=""
                        >
                          {cards.map((card, index) => {
                            if (
                              card.state === "PROGRESS" &&
                              card.project === projectId
                            ) {
                              return (
                                <Draggable
                                  key={card._id}
                                  draggableId={card._id}
                                  index={index}
                                >
                                  {(draggableProvided, snapshot) => {
                                    if (snapshot.isDragging) {
                                      draggableProvided.draggableProps.style.left =
                                        undefined;
                                      draggableProvided.draggableProps.style.top =
                                        undefined;
                                    }
                                    return (
                                      <div
                                        {...draggableProvided.draggableProps}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.dragHandleProps}
                                      >
                                        <Card
                                          title={card.title}
                                          description={card.description}
                                          state={card.state}
                                          color={card.color}
                                          cardId={card._id}
                                          cardLimitDate={card.limitDate}
                                          setDeleteModalHasRender={
                                            setDeleteModalHasRender
                                          }
                                          setOpenDeleteModal={
                                            setOpenDeleteModal
                                          }
                                          setDeleteTaskId={setDeleteTaskId}
                                          setEditModalHasRender={
                                            setEditModalHasRender
                                          }
                                          setOpenEditModal={setOpenDeleteModal}
                                          setEditTaskId={seteditTaskId}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            }
                          })}
                        </div>
                        {droppableProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <Droppable droppableId="done">
                    {(droppableProvided) => (
                      <div className="p-6 pt-2 bg-white border border-black">
                        <div className=" border-b-2 mb-5  pb-2  ">
                          <h2 className="text-xl  border-color-black">DONE</h2>
                        </div>
                        <div
                          {...droppableProvided.droppableProps}
                          ref={droppableProvided.innerRef}
                          className=""
                        >
                          {cards.map((card, index) => {
                            if (
                              card.state === "DONE" &&
                              card.project === projectId
                            ) {
                              return (
                                <Draggable
                                  key={card._id}
                                  draggableId={card._id}
                                  index={index}
                                >
                                  {(draggableProvided, snapshot) => {
                                    if (snapshot.isDragging) {
                                      draggableProvided.draggableProps.style.left =
                                        undefined;
                                      draggableProvided.draggableProps.style.top =
                                        undefined;
                                    }
                                    return (
                                      <div
                                        {...draggableProvided.draggableProps}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.dragHandleProps}
                                      >
                                        <Card
                                          title={card.title}
                                          description={card.description}
                                          state={card.state}
                                          color={card.color}
                                          cardId={card._id}
                                          cardLimitDate={card.limitDate}
                                          setDeleteModalHasRender={
                                            setDeleteModalHasRender
                                          }
                                          setOpenDeleteModal={
                                            setOpenDeleteModal
                                          }
                                          setDeleteTaskId={setDeleteTaskId}
                                          setEditModalHasRender={
                                            setEditModalHasRender
                                          }
                                          setOpenEditModal={setOpenDeleteModal}
                                          setEditTaskId={seteditTaskId}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            }
                          })}
                        </div>
                        {droppableProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </DragDropContext>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </>
  );
}
export default ProjectCards;
