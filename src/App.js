import { useState } from 'react';
import { supabase } from '../src/supabaseClient'

import './App.css';
import { BrowserRouter,Routes, Route, Link, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard'
import Sidebar from './components/Sidebar';
import SingleListing from './components/SingleListing'
import HomePage from './components/HomePage';
import AdminSideBar from './components/AdminSideBar';
import BrowseListings from './components/BrowseListings';
import Notification from './components/Notification';
import { useEffect } from 'react';
import AddArticles from './components/AddArticles';
import BrowseBlog from './components/BrowseBlog';
import SingleBlog from './components/SingleBlog';
import UnitConverter from './components/UnitConverter';
import FavoriteList from './components/FavoriteList';
import MortageCalculator from './components/MortageCalculator';
import FilteredResults from './components/FilteredResults';


import  {LoginContext} from "./Contexts/LoginContext";
import BrowseForum from './components/BrowseForum';
import SingleForum from './components/SingleForum';




function App() {

  const navigate = useNavigate();

  const [loggedIn,SetloggedIn] = useState(false);
  const [userID,setuserID] = useState("");
  const [userType,setuserType] = useState("");
  const [notificationBadge,setnotificationBadge] = useState(false);
  const [notifications,setnotifications] = useState([]);
  const [filteredResults,setFilRes] = useState([]);

  const currentuser = '2e0ef298-f57d-4223-b1c7-14200f2414e0';



  const channel = supabase
  .channel('table-db-changes')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Notification', filter: `UserFavrted_ID=eq.${userID}`, }, (payload) =>{
    console.log(payload)
    setnotificationBadge(true);
    getNotifications();
  }
  ).on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'Notification', filter: `UserFavrted_ID=eq.${userID}`, }, (payload) =>{
    console.log(payload)
    //setnotificationBadge(true);
    getNotifications();
  })
  .subscribe()


  const getNotifications = async ()=>{

    let { data, error } = await supabase.rpc('getnotifications', {
        currentuser:userID
      })

      if(data===null || error || data.length===0){
        setnotifications(undefined)
        setnotificationBadge(false);
      }
      else if(data.length>0){
        setnotificationBadge(true);
        setnotifications(data);
        console.log(data);
      }

      console.log(data,error)
}

const MarkNotificationASRead = async(notid) =>{
      let { data, error } = await supabase.rpc('marknotificationasread', {
      notid:notid
    })

    console.log(error,data);

    if(!error){
      getNotifications();
    }
 
}

const confirmSessionApp = async()=>{

  const { data, error } = await supabase.auth.getSession();
  console.log(data,error);
  if(error===null&&data.session!==null){
    setuserID(data.session.user.id);
    setuserType("Member");
    SetloggedIn(true);

    setTimeout(()=>{
      getNotifications();
      //navigate("/HomePage")
    },1500)
    

  }
  else{
    setuserID(null);
    setuserType("");
    SetloggedIn(false);
    navigate("/HomePage")
  }
  //console.log(data.session.user.id,error);
}

useEffect(async()=>{
  
  confirmSessionApp();

},[])

  return (
    <LoginContext.Provider value={{loggedIn,SetloggedIn,userID,userType,setuserID,setuserType}}>
   
    <Navbar notificationBadge={notificationBadge}/>
    <Routes>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/register" element={<Signup/>}></Route>
      <Route path="/MemberPortal/*" element={<Sidebar/>}></Route>
      <Route path="/SingleListing/:propertyid" element={<SingleListing/>}></Route>
      <Route path="/HomePage" element={<HomePage setFilRes={setFilRes}/>}></Route>
      <Route path="/AdminPortal/*" element={<AdminSideBar/>}></Route>
      <Route path="/Browse" element={<BrowseListings/>}></Route>
      <Route path="/Notifications" element={<Notification setnotificationBadge={setnotificationBadge} getNotifications={getNotifications} MarkNotificationASRead={MarkNotificationASRead}
      notifications={notifications} />}></Route>
      <Route path="/BrowseBlogs" element={<BrowseBlog/>}></Route>
      <Route path="/SingleBlog/:blogid" element={<SingleBlog/>}></Route>
      <Route path="/AreaUnitCoverter" element={<UnitConverter/>}></Route>
      <Route path="/MortageCalculator" element={<MortageCalculator/>}></Route>
      <Route path="/ViewFavoriteList" element={<FavoriteList/>}></Route>
      <Route path="/FilteredResults" element={<FilteredResults filteredResults={filteredResults}/>}></Route>
      <Route path="/BrowseForum" element={<BrowseForum/>}></Route> 
      <Route path="/SingleForum/:forumid" element={<SingleForum/>}></Route>  
    </Routes>

  </LoginContext.Provider>
  );
}

export default App;
