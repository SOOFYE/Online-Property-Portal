import { useState } from 'react';

import './App.css';
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard'
import Sidebar from './components/Sidebar';
import SingleListing from './components/SingleListing'
import HomePage from './components/HomePage';
import AdminSideBar from './components/AdminSideBar';



function App() {

  const [loggedIn,SetloggedIn] = useState(true);

  return (
    <BrowserRouter>
    <Navbar loggedIn={loggedIn}/>
    <Routes>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/register" element={<Signup/>}></Route>
      <Route path="/MemberPortal/*" element={<Sidebar/>}></Route>
      <Route path="/SingleListing/:propertyid" element={<SingleListing/>}></Route>
      <Route path="/HomePage" element={<HomePage/>}></Route>
      <Route path="/AdminPortal/*" element={<AdminSideBar/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
