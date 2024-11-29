// Calendar.js
import React, { useContext, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'; // أضف أي تنسيقات إضافية هنا
import { MyContext } from '../../../Context/MyState';

const localizer = momentLocalizer(moment); // إعداد localizer

const CalendarPage = () => {
    const context = useContext(MyContext);
    const { darkMode } = context;

    const [events, setEvents] = useState([]);
    const [showEventModal, setShowEventModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

    const handleSelect = ({ start, end }) => {
        setNewEvent({ start, end, title: '' });
        setShowEventModal(true);
    };

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, title: e.target.value });
    };

    const handleAddEvent = () => {
        if (newEvent.title) {
            setEvents([...events, { ...newEvent, allDay: true }]);
            setShowEventModal(false);
        }
    };

    const calendarStyle = {
        height: '100vh',
        padding: '20px',
        background: darkMode ? 'rgb(38, 48, 68)' : 'white',
        color: darkMode ? 'white' : 'black',
    };

    return (
        <div>
            <div className="text-inherit">
                <h1>Calender</h1>

            </div>
            <div style={calendarStyle}>
                <Calendar
                    background="#000"
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', width: '100%', background: darkMode ? "rgb(38, 48, 68)" : "white" }}
                    selectable
                    onSelectSlot={handleSelect}
                />

                {showEventModal && (
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" style={{ color: "#000" }}>Add New Event</h5>
                                    <button type="button" className="close" onClick={() => setShowEventModal(false)}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        value={newEvent.title}
                                        onChange={handleInputChange}
                                        placeholder="Event Title"
                                        className="form-control"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowEventModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleAddEvent}>
                                        Add Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;
