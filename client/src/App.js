// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoriesList from './Pages/CategoriesList';
import ProductList from './Pages/ProductList'; 
import MainCourses from './Pages/MainCourses';
import Appetizers from './Pages/Appetizers';
import Desserts from './Pages/Desserts';

function App() {

  const useDynamicRoutes = process.env.REACT_APP_USE_DINAMIC_ROUTES === 'true';

  if (useDynamicRoutes) {

    return (
      <Router>
        <div>
          <CategoriesList />
          <Routes>
            <Route path="/products/:category" element={<ProductList />} />
            {/* Другие маршруты */}
          </Routes>
        </div>
      </Router>
    );

  } else {

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

  } // else

}

export default App;


