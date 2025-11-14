import './App.css';
import './Page6.css';
import Desc from './assets/Page6/desc.png';
import DL from './assets/Page6/doubleLine.png';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Page6() {
  const navigate = useNavigate();

  // For showing the current time and date to the user
  const [dateTime, setDateTime] = useState(new Date());


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




   return (
    <div className="app-background">
      <h1 className="sched">Schedule</h1>
      <h1 className="today">Today's Date:</h1>
      <img src={DL} alt="Double Line" className="double-line" />
      <img src={Desc} alt="Description" className="desc" />

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
            className={`calendar-day ${day ? '' : 'empty'} ${day === today.getDate() && currentMonth === today.getMonth() ? '' : ''}`}
            onClick={() => day && setSelectedDay(day)}
          >
            {day}
          </div>
        ))}
      </div>

      {selectedDay && (
        <div className="selected-day-popup">
          <p>Selected: {monthNames[currentMonth]} {selectedDay}, {currentYear}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Page6;