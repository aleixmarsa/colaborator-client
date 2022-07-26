import React from 'react'

import { useState, useEffect } from 'react';
import axios from 'axios';

import "../index.css";

import NavBar from '../components/navbar/NavBar'
import LateralBar from "../components/sections/LateralBar";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import styled from "@emotion/styled";

const API_URL = "http://localhost:5005";

export const StyleWrapper = styled.div`
  .fc-dayGridMonth-button, .fc-button, .fc-button-primary, .fc-button-active {
    background-color: #15803d;
    border: #16b34a;
  }

  .fc-button-active {
    background-color: #16a34a;
    border: #15803d;
  }

  .fc-dayGridMonth-button:hover, .fc-button:hover, .fc-button-primary:hover{
    background-color: #16a34a;
    border: #15803d
  }

  .fc-daygrid-day-number {
    color: #16a34a;
  }

  .fc-col-header-cell-cushion {
    color: #16a34a;
  }
`

function CalendarPage () {

    const [events, setEvents] = useState([])

    const getAllEvents = () => {

        axios
        .get(`${API_URL}/colaborator-API/projects/card/get-cards`)
        .then((allCards) => {
            console.log("All cards:", allCards.data)
            let array = [];
            allCards.data.map((event) => {
                console.log(event)
                
    
                let startDate = event.limitDate + 'T07:00:00';
                let endDate = event.limitDate + 'T08:00:00';
    
                let eventObject = {
                    id: event._id,
                    title: event.title,
                    start: startDate,
                    end: endDate,
                    color: event.color
                }

                array.push(eventObject)  
            })
            setEvents(array)           
        })
        .catch((error) => console.log(error));
    }

    
    useEffect(() => {
        getAllEvents()
    }, [])


    return (
        <>
            <NavBar />
            

            <div className="flex flex-row">
              <LateralBar />
                <StyleWrapper>
                  <div className='m-2'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        height="auto"
                        initialView="dayGridMonth"
                        headerToolbar={{center: 'dayGridMonth,timeGridWeek,timeGridDay new'}}
                        customButtons={{
                        new: {
                            text: 'new',
                            click: () => console.log('new event'),
                        },
                        }}
                        events={events}
                        nowIndicator
                        dateClick={(e) => console.log(e.dateStr)}
                        eventClick={(e) => console.log(e.event.id)}
                    />
                    </div>
                </StyleWrapper>
            </div>
        </>
    )
}
export default CalendarPage