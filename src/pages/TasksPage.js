import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import Card from "../components/sections/cardPage/Card";
import CardForm from "../components/sections/cardPage/CardForm";
import NavBar from "../components/navbar/NavBar";
import DeleteTaskModal from "../components/modals/DeleteTaskModal";
import EditTaskModal from "../components/modals/EditTaskModal";

import io from "socket.io-client";
let socket;

const API_URL = "http://localhost:5005";

function ProjectCards(props) {
  const params = useParams();
  const projectId = params.projectId;

  const [cardForm, setCardForm] = useState(false);

  const [deleteModalHasRender, setDeleteModalHasRender] = useState(false);
  const [editModalHasRender, setEditModalHasRender] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(true);

  const [deleteTaskId, setDeleteTaskId] = useState("");
  const [editTaskId, seteditTaskId] = useState("");

  const [cards, setCards] = useState([]);

  const updateCardStat = (cardId, destination) => {
    axios
      .put(
        `${API_URL}/colaborator-API/projects/card/updateCard/${cardId}/${destination}`
      )
      .then((response) => {});
  };

  const getAllCards = () => {
    axios
      .get(`${API_URL}/colaborator-API/projects/card/get-cards`)
      .then((allCards) => {
        setCards(allCards.data);
      })
      .catch((error) => console.log(error));
  };

  const socketConnection = () => {
    const storedToken = localStorage.getItem("authToken");
    socket = io.connect("http://localhost:5005", {
      extraHeaders: { Authorization: `Bearer ${storedToken}` },
    });
    socket.on("receive_new_task", (e) => {
      getAllCards();
    });
    socket.on("receive_edit_task", (e) => {
      getAllCards();
    });
    socket.on("receive_delete_task", (e) => {
      getAllCards();
    });
  };

  useEffect(() => {
    getAllCards();
    socketConnection();
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
      const stat = destination.droppableId.toUpperCase();
      const cardCopy = { ...upCard, stat };

      const newSetCards = cards.map((card) => {
        if (card._id === cardCopy._id) {
          return cardCopy;
        } else {
          return card;
        }
      });

      setCards(newSetCards);
      updateCardStat(result.draggableId, destination.droppableId);
    }

    setCards((prevTasks) =>
      reorder(prevTasks, source.index, destination.index)
    );
  };

  return (
    <>
      <NavBar />
      {deleteModalHasRender && (
        <DeleteTaskModal
          socket={socket}
          setOpenDeleteModal={setOpenDeleteModal}
          openDeleteModal={openDeleteModal}
          deleteTaskId={deleteTaskId}
          getAllCards={getAllCards}
        />
      )}
      {editModalHasRender && (
        <EditTaskModal
          socket={socket}
          setOpenEditModal={setOpenEditModal}
          openEditModal={openEditModal}
          editTaskId={editTaskId}
          getAllCards={getAllCards}
        />
      )}

      <DragDropContext onDragEnd={(result) => updateCards(result)}>
        <div className="container mx-auto mt-2">
          <div className="drop-shadow-md grid grid-cols-1 ml-5 mr-5 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-5 mb-10 ">
            {!cardForm ? (
              <Droppable droppableId="todo">
                {(droppableProvided) => (
                  <div className="p-6 pt-2 bg-stone-50">
                    <div className=" border-b-2 mb-5  pb-2  ">
                      <h2 className="text-xl  border-color-black">TO-DO</h2>
                    </div>

                    <div
                      {...droppableProvided.droppableProps}
                      ref={droppableProvided.innerRef}
                      className=""
                    >
                      <button
                        onClick={() => setCardForm(true)}
                        type="button"
                        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 m-2"
                      >
                        <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                      </button>
                      {cards.map((card, index) => {
                        if (
                          card.stat === "TODO" &&
                          card.project === projectId
                        ) {
                          return (
                            <Draggable
                              key={card._id}
                              draggableId={card._id}
                              index={index}
                            >
                              {(draggableProvided) => (
                                <div
                                  {...draggableProvided.draggableProps}
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.dragHandleProps}
                                >
                                  <Card
                                    title={card.title}
                                    description={card.description}
                                    stat={card.stat}
                                    color={card.color}
                                    cardId={card._id}
                                    cardLimitDate={card.limitDate}
                                    setDeleteModalHasRender={
                                      setDeleteModalHasRender
                                    }
                                    setOpenDeleteModal={setOpenDeleteModal}
                                    setDeleteTaskId={setDeleteTaskId}
                                    setEditModalHasRender={
                                      setEditModalHasRender
                                    }
                                    setOpenEditModal={setOpenDeleteModal}
                                    setEditTaskId={seteditTaskId}
                                    getAllCards={getAllCards}
                                    cardIndex={index}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                    </div>

                    {droppableProvided.placeholder}

                    
                  </div>
                )}
              </Droppable>
            ) : (
              <CardForm
                socket={socket}
                setCardForm={setCardForm}
                setCards={setCards}
                getAllCards={getAllCards}
                cards={cards}
                projectId={projectId}
              />
            )}

            <Droppable droppableId="progress">
              {(droppableProvided) => (
                <div className="p-6 pt-2 bg-stone-50">
                  <div className=" border-b-2 mb-5  pb-2  ">
                    <h2 className="text-xl  border-color-black">IN PROGRESS</h2>
                  </div>

                  <div
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className=""
                  >
                    {cards.map((card, index) => {
                      if (
                        card.stat === "PROGRESS" &&
                        card.project === projectId
                      ) {
                        return (
                          <Draggable
                            key={card._id}
                            draggableId={card._id}
                            index={index}
                          >
                            {(draggableProvided) => (
                              <div
                                {...draggableProvided.draggableProps}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                              >
                                <Card
                                  title={card.title}
                                  description={card.description}
                                  stat={card.stat}
                                  color={card.color}
                                  cardId={card._id}
                                  cardLimitDate={card.limitDate}
                                  setDeleteModalHasRender={
                                    setDeleteModalHasRender
                                  }
                                  setOpenDeleteModal={setOpenDeleteModal}
                                  setDeleteTaskId={setDeleteTaskId}
                                  setEditModalHasRender={setEditModalHasRender}
                                  setOpenEditModal={setOpenDeleteModal}
                                  setEditTaskId={seteditTaskId}
                                  getAllCards={getAllCards}
                                />
                              </div>
                            )}
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
                <div className="p-6 pt-2 bg-stone-50">
                  <div className=" border-b-2 mb-5  pb-2  ">
                    <h2 className="text-xl  border-color-black">DONE</h2>
                  </div>

                  <div
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className=""
                  >
                    {cards.map((card, index) => {
                      if (card.stat === "DONE" && card.project === projectId) {
                        return (
                          <Draggable
                            key={card._id}
                            draggableId={card._id}
                            index={index}
                          >
                            {(draggableProvided) => (
                              <div
                                {...draggableProvided.draggableProps}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                              >
                                <Card
                                  title={card.title}
                                  description={card.description}
                                  stat={card.stat}
                                  color={card.color}
                                  cardId={card._id}
                                  cardLimitDate={card.limitDate}
                                  setDeleteModalHasRender={
                                    setDeleteModalHasRender
                                  }
                                  setOpenDeleteModal={setOpenDeleteModal}
                                  setDeleteTaskId={setDeleteTaskId}
                                  setEditModalHasRender={setEditModalHasRender}
                                  setOpenEditModal={setOpenDeleteModal}
                                  setEditTaskId={seteditTaskId}
                                  getAllCards={getAllCards}
                                />
                              </div>
                            )}
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
    </>
  );
}

export default ProjectCards;
