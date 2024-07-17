import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimetableView = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/timetables/')
      .then(response => {
        setTimetable(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Timetable</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map(item => (
            <tr key={item._id}>
              <td>{item.course_id}</td>
              <td>{item.day_of_week}</td>
              <td>{item.start_time}</td>
              <td>{item.end_time}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableView;
