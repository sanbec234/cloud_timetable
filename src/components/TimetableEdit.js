import React, { useState } from 'react';
import axios from 'axios';

const TimetableEdit = () => {
  const [course_id, setCourseId] = useState('');
  const [day_of_week, setDayOfWeek] = useState('');
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTimetable = { course_id, day_of_week, start_time, end_time, location };
    
    axios.post('http://localhost:5000/timetables/add', newTimetable)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Edit Timetable</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID:</label>
          <input type="text" value={course_id} onChange={(e) => setCourseId(e.target.value)} />
        </div>
        <div>
          <label>Day of Week:</label>
          <input type="text" value={day_of_week} onChange={(e) => setDayOfWeek(e.target.value)} />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="text" value={start_time} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label>End Time:</label>
          <input type="text" value={end_time} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label>Passcode:</label>
          <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} />
        </div>
        <button type="submit">Update Timetable</button>
      </form>
    </div>
  );
};

export default TimetableEdit;