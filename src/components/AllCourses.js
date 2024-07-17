// AllCourses.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from MongoDB
    axios.get('/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        console.log('Fetched courses:', response.data); // Log data
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);  

  return (
    <div>
      <h2>All Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.course_id}>
            <strong>Course ID:</strong> {course.course_id}<br />
            <strong>Course Name:</strong> {course.course_name}<br />
            <strong>Faculty Passcode:</strong> {course.faculty_passcode}<br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCourses;
