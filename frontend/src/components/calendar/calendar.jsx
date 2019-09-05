import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../../../public/css/calendar.css";
import TaskSummary from './task-summary';


const localizer = momentLocalizer(moment);

const sampleEvent =[
    {
        title:"test",
        start:"",
        end:"",
        allDay:false,
        resource:"none",
    }
];

class CalendarView extends React.Component {

    render() {
        return (
           <div className="calendar-main">
               <div className="calendar-wrap">
                 <Calendar 
                    localizer={localizer}
                    events={sampleEvent}
                    startAccessor="start"
                    endAccessor="end"
                 />
                </div>
           </div>
        );
    }
}

export default CalendarView;