import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Period {
  id: number;
  subject: string;
  course_code: string;
}

const TimetableComponent: React.FC = () => {
  const [periodData, setPeriodData] = useState<Period[]>([]);
  const [editPeriod, setEditPeriod] = useState<Partial<Period>>({});

  useEffect(() => {
    fetchPeriods();
  }, []);

  const fetchPeriods = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/periods');
      setPeriodData(response.data);
    } catch (error) {
      console.error('Error fetching periods:', error);
    }
  };

  const handleCreatePeriod = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/periods', editPeriod);
      setPeriodData([...periodData, response.data]);
      setEditPeriod({});
    } catch (error) {
      console.error('Error creating period:', error);
    }
  };

  const handleUpdatePeriod = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:5002/api/periods/${id}`, editPeriod);
      setPeriodData(periodData.map(p => (p.id === id ? response.data : p)));
      setEditPeriod({});
    } catch (error) {
      console.error('Error updating period:', error);
    }
  };

  const handleDeletePeriod = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5002/api/periods/${id}`);
      setPeriodData(periodData.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting period:', error);
    }
  };

  return (
    <div>
      <h1>Timetable Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Course Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {periodData.map(period => (
            <tr key={period.id}>
              <td>{period.id}</td>
              <td>{period.subject}</td>
              <td>{period.course_code}</td>
              <td>
                <button onClick={() => setEditPeriod(period)}>Edit</button>
                <button onClick={() => handleDeletePeriod(period.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>{editPeriod.id ? 'Edit Period' : 'Create Period'}</h2>
        <input
          type="number"
          placeholder="ID"
          value={editPeriod.id || ''}
          onChange={e => setEditPeriod({ ...editPeriod, id: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Subject"
          value={editPeriod.subject || ''}
          onChange={e => setEditPeriod({ ...editPeriod, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course Code"
          value={editPeriod.course_code || ''}
          onChange={e => setEditPeriod({ ...editPeriod, course_code: e.target.value })}
        />
        <button onClick={handleCreatePeriod}>Create</button>
        <button onClick={() => handleUpdatePeriod(editPeriod.id!)}>Update</button>
      </div>
    </div>
  );
};

export default TimetableComponent;
