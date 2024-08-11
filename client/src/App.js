import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainCourses from './MainCourses';
import Appetizers from './Appetizers';
import Desserts from './Desserts';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/main-courses">Main Courses</Link></li>
            <li><Link to="/appetizers">Appetizers</Link></li>
            <li><Link to="/desserts">Desserts</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/main-courses" element={<MainCourses />} />
          <Route path="/appetizers" element={<Appetizers />} />
          <Route path="/desserts" element={<Desserts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

