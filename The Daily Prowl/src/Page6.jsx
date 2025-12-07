import './App.css';
import './Page6.css';
import Desc from './assets/Page6/desc.png';
import DL from './assets/Page6/doubleLine.png';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { getCurrentUser } from './utils/mockAuth';


function Page6() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // For showing the current time and date to the user
  const [dateTime, setDateTime] = useState(new Date());
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDate, setPopupDate] = useState(null);
  const [removing, setRemoving] = useState(false);

  // Fetch current user and scheduled events on mount
  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      if (user) {
        fetchScheduledEvents(user.id);
      }
    };
    init();
  }, []);

  const fetchScheduledEvents = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('scheduled_event')
        .select(`
          *,
          event (*)
        `)
        .eq('student_id', userId);

      if (error) throw error;
      setScheduledEvents(data || []);
    } catch (err) {
      console.error('Error fetching scheduled events:', err.message);
    }
  };

  // 🌀 2. Update the time every second so it stays real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // clean up on unmount
  }, []);


  // 🗓️ 3. Format the date nicely
  const formattedDate = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',   // "Tuesday"
    month: 'long',     // "November"
    day: 'numeric',    // "4"
    year: 'numeric'    // "2025"
  });


  // 🕘 4. Format the time (like "9:59 AM")
  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });


    //For creating the calendar system that allows for the user to click each date
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);


    // Get the current month details
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = firstDayOfMonth.getDay(); // 0 = Sunday


  // Generate array for days
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null); // blank days before month starts
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }


  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if a specific day has scheduled events
  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return scheduledEvents.filter(se => {
      if (!se.event || !se.event.start_datetime) return false;
      const eventDate = new Date(se.event.start_datetime);
      return eventDate.getFullYear() === dateToCheck.getFullYear() &&
             eventDate.getMonth() === dateToCheck.getMonth() &&
             eventDate.getDate() === dateToCheck.getDate();
    });
  };

  const hasEventsOnDay = (day) => {
    return getEventsForDay(day).length > 0;
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const eventsOnDay = getEventsForDay(day);
    if (eventsOnDay.length > 0) {
      setSelectedDayEvents(eventsOnDay);
      setPopupDate(new Date(currentYear, currentMonth, day));
      setShowPopup(true);
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
      setShowPopup(false);
    }
  };

  const handleRemoveFromSchedule = async (eventId) => {
    if (!currentUser) {
      alert('Please log in to manage your schedule');
      return;
    }

    setRemoving(true);
    try {
      const { error } = await supabase
        .from('scheduled_event')
        .delete()
        .eq('student_id', currentUser.id)
        .eq('event_id', eventId);

      if (error) throw error;

      // Refresh the scheduled events
      await fetchScheduledEvents(currentUser.id);

      // Update popup events
      const updatedEvents = selectedDayEvents.filter(se => se.event_id !== eventId);
      if (updatedEvents.length === 0) {
        setShowPopup(false);
      } else {
        setSelectedDayEvents(updatedEvents);
      }
    } catch (err) {
      alert('Error removing event: ' + err.message);
    } finally {
      setRemoving(false);
    }
  };

  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const popupStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    popup: {
      background: '#fff',
      borderRadius: '14px',
      padding: '20px',
      maxWidth: '90%',
      width: '350px',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    },
    popupHeader: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#171513',
      marginBottom: '15px',
      textAlign: 'center'
    },
    eventCard: {
      background: '#f8f8f8',
      borderRadius: '10px',
      padding: '12px',
      marginBottom: '12px',
      border: '1px solid #ddd'
    },
    eventTitle: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#171513',
      marginBottom: '8px'
    },
    eventInfo: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '0.95rem',
      color: '#555',
      marginBottom: '4px'
    },
    eventDescription: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '0.9rem',
      color: '#666',
      marginTop: '8px',
      padding: '8px',
      background: '#eee',
      borderRadius: '6px'
    },
    removeButton: {
      width: '100%',
      background: '#dc3545',
      border: '2px solid #a71d2a',
      borderRadius: '10px',
      padding: '10px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#fff',
      cursor: 'pointer',
      marginTop: '10px'
    },
    closeButton: {
      width: '100%',
      background: '#e0c25a',
      border: '2px solid #1f1a0e',
      borderRadius: '10px',
      padding: '10px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#171513',
      cursor: 'pointer',
      marginTop: '10px'
    }
  };

   return (
    <div className="app-background">
      <h1 className="sched">Schedule</h1>
      <h1 className="today">Today's Date:</h1>
      <img src={DL} alt="Double Line" className="double-line" />
      <img src={Desc} onClick={() => navigate('/third')} alt="Description" className="desc" style = {{cursor: 'pointer'}}/>
      
      <div className="calendar-container">
        <p className="date">{formattedDate}</p>
        <p className="time">{formattedTime}</p>
        
        <div className="calendar-header">
        <button onClick={handlePrevMonth}>◀</button>
        <h2>{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={handleNextMonth}>▶</button>
      </div>
      
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}

        {days.map((day, i) => (
          <div
            key={i}
            className={`calendar-day ${day ? '' : 'empty'} ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'today' : ''}`}
            onClick={() => handleDayClick(day)}
            style={hasEventsOnDay(day) ? { position: 'relative' } : {}}
          >
            {day}
            {hasEventsOnDay(day) && (
              <span style={{
                position: 'absolute',
                bottom: '4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '6px',
                background: '#f8bd00',
                borderRadius: '50%',
                border: '1px solid #1f1a0e'
              }}></span>
            )}
          </div>
        ))}
      </div>

      {selectedDay && !showPopup && (
        <div className="selected-day-popup">
          <p>Selected: {monthNames[currentMonth]} {selectedDay}, {currentYear}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>No events scheduled</p>
        </div>
      )}
    </div>

      {/* Event Details Popup */}
      {showPopup && (
        <div style={popupStyles.overlay} onClick={() => setShowPopup(false)}>
          <div style={popupStyles.popup} onClick={(e) => e.stopPropagation()}>
            <div style={popupStyles.popupHeader}>
              📅 {popupDate && popupDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {selectedDayEvents.map((se) => (
              <div key={se.event_id} style={popupStyles.eventCard}>
                <div style={popupStyles.eventTitle}>{se.event?.title}</div>

                <div style={popupStyles.eventInfo}>
                  🕐 {formatEventTime(se.event?.start_datetime)}
                </div>

                {se.event?.location && (
                  <div style={popupStyles.eventInfo}>
                    📍 {se.event.location}
                  </div>
                )}

                {se.event?.description && (
                  <div style={popupStyles.eventDescription}>
                    {se.event.description}
                  </div>
                )}

                <button
                  style={popupStyles.removeButton}
                  onClick={() => handleRemoveFromSchedule(se.event_id)}
                  disabled={removing}
                >
                  {removing ? 'Removing...' : '✕ Remove from Schedule'}
                </button>
              </div>
            ))}

            <button style={popupStyles.closeButton} onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page6;