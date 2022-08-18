import React from "react";

import { useState, useEffect, useContext } from "react";
import axios from "axios";

import "../index.css";

import NavBar from "../components/navbar/NavBar";
import LateralBar from "../components/sections/LateralBar";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket.context";

const API_URL = process.env.REACT_APP_API_URL;

export const StyleWrapper = styled.div`
  .fc-dayGridMonth-button,
  .fc-button,
  .fc-button-primary,
  .fc-button-active {
    background-color: #265b6a;
    border: #265b6a;
  }

  .fc-button-active {
    background-color: #16a34a;
    border: #15803d;
  }

  .fc-dayGridMonth-button:hover,
  .fc-button:hover,
  .fc-button-primary:hover {
    background-color: #5b8d9d;
    border: #5b8d9d;
  }

  .fc-daygrid-day-number {
    color: #f89235;
  }

  .fc-col-header-cell-cushion {
    color: #265b6a;
  }
`;

function CalendarPage() {
  const { projectId } = useParams();

  const [events, setEvents] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("getEvents", projectId);
  }, []);

  useEffect(() => {
    socket.on("getEvents", (events) => {
      setEvents([...events]);
    });
    socket.on("updateCalendar", () => {
      socket.emit("getEvents", projectId);
    });
  }, [socket]);

  return (
    <>
      <NavBar />

      <div className="flex bg-neutral-50 flex-row">
        <LateralBar projectId={projectId} />
        <StyleWrapper>
          <div className="m-2">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              height="auto"
              initialView="dayGridMonth"
              headerToolbar={{
                center: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              customButtons={{
                new: {
                  text: "new",
                  click: () => console.log("new event"),
                },
              }}
              events={events}
            />
          </div>
        </StyleWrapper>
      </div>
    </>
  );
}
export default CalendarPage;
