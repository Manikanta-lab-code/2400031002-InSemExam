import React, { useState } from "react";

const Calendar = () => {
  // Predefined events
  const events = [
    { date: "2025-10-05", title: "Team Meeting", description: "Project discussion with team." },
    { date: "2025-10-10", title: "Client Presentation", description: "Present new features to client." },
    { date: "2025-10-15", title: "Code Review", description: "Review codebase and fix bugs." },
    { date: "2025-10-25", title: "Hackathon", description: "Participate in 24-hour coding event." },
    { date: "2025-11-02", title: "Workshop", description: "Attend a technical workshop." },
  ];

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Handle date click
  const handleDateClick = (day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
    const eventsForDate = events.filter((event) => event.date === formattedDate);
    setSelectedEvents(eventsForDate);
  };

  // Handle month/year change
  const handleMonthChange = (e) => setMonth(Number(e.target.value));
  const handleYearChange = (e) => setYear(Number(e.target.value));

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", textAlign: "center" }}>
      <h2>Interactive Calendar</h2>

      {/* Month and Year Selector */}
      <div style={{ marginBottom: "20px" }}>
        <select value={month} onChange={handleMonthChange} style={{ padding: "5px 10px", marginRight: "10px" }}>
          {monthNames.map((m, index) => (
            <option key={index} value={index}>
              {m}
            </option>
          ))}
        </select>

        <select value={year} onChange={handleYearChange} style={{ padding: "5px 10px" }}>
          {Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {days.map((day) => {
          const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isSelected = selectedDate === formattedDate;
          const hasEvent = events.some((event) => event.date === formattedDate);

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              style={{
                padding: "15px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: isSelected
                  ? "#4CAF50"
                  : hasEvent
                  ? "#d1f7c4"
                  : "#f0f0f0",
                color: isSelected ? "white" : "black",
                fontWeight: hasEvent ? "bold" : "normal",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Event Details */}
      <div style={{ marginTop: "30px" }}>
        {selectedDate ? (
          selectedEvents.length > 0 ? (
            <>
              <h3>Events on {selectedDate}</h3>
              {selectedEvents.map((event, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#e0ffe0",
                    margin: "10px auto",
                    padding: "10px",
                    borderRadius: "8px",
                    maxWidth: "400px",
                  }}
                >
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No events for this date.</p>
          )
        ) : (
          <p>Select a date to see events.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;