// src/components/home/Home.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './_home.css'; // Import your CSS file

interface Period {
  id: number;
  subject: string;
  course_code: string;
}

const periods = [
  { period: 1, time: "8.30 - 9.20" },
  { period: 2, time: "9.20 - 10.10" },
  { period: 3, time: "10.30 - 11.20" },
  { period: 4, time: "11.20 - 12.10" },
  { period: 5, time: "1.40 - 2.30" },
  { period: 6, time: "2.30 - 3.20" },
  { period: 7, time: "3.30 - 4.20" },
  { period: 8, time: "4.20 - 5.10" },
];

const days = ["MON", "TUE", "WED", "THU", "FRI"];

const Home: React.FC = () => {
  const [periodData, setPeriodData] = useState<Period[]>([]);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/periods');
        setPeriodData(response.data);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };

    fetchPeriods();
  }, []);

  const getPeriodInfo = (id: number) => {
    const period = periodData.find(p => p.id === id);
    return period ? `${period.course_code}` : '';
  };

  return (
    <div className="timetable-container">
      <Link to="/login">
        <button className="btn">Edit Timetable</button>
      </Link>
      <table className="timetable">
        <thead>
          <tr>
            <th>Day/Time</th>
            {periods.map(p => (
              <th key={p.period}>{p.time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => (
            <tr key={day}>
              <td className="day">{day}</td>
              {periods.map((p, periodIndex) => (
                <td key={p.period} className="period">
                  {getPeriodInfo(dayIndex * 8 + periodIndex + 1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
