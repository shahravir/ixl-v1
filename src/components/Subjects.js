import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Check if subjects exist in localStorage
        const storedSubjects = localStorage.getItem('subjects');

        if (storedSubjects) {
          setSubjects(JSON.parse(storedSubjects));
        } else {
          const response = await axios.get('http://localhost:8080/subjects');
          const fetchedSubjects = response.data;
          setSubjects(fetchedSubjects);

          // Store subjects in localStorage
          localStorage.setItem('subjects', JSON.stringify(fetchedSubjects));
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const loadSubjectModule = async (moduleName) => {
    try {
      // Dynamically import the JavaScript module
      const module = await import(`./${moduleName}.js`);
      console.log(module);
      window.location.href = `./${moduleName}`;
    } catch (error) {
      console.error('Error loading module:', error);
    }
  };

  return (
    <div className="subject-page">
      <h2>Subjects</h2>
      <ul>
        {subjects.map(subject => (
          <li key={subject.id}>
            {/* Use onClick event to load the module when the subject is clicked */}
            <button onClick={() => loadSubjectModule(subject.subject_name)}>
              {subject.subject_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subjects;
