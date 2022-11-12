import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function Notification({setnotificationBadge,getNotifications,MarkNotificationASRead,notifications}) {

  // const channel = supabase
  // .channel('table-db-changes')
  // .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Notification', filter: `UserFavrted_ID=eq.${currentuser}`, }, (payload) =>{
  //   console.log(payload)
  //   setnotificationBadge(true);
  //   getNotifications();
  // }
  // )
  // .subscribe()

  // const currentuser = '2e0ef298-f57d-4223-b1c7-14200f2414e0';

  // const [notifications,setnotifications] = useState([]);

  

  // const getNotifications = async ()=>{

  //         let { data, error } = await supabase.rpc('getnotifications', {
  //             currentuser:currentuser
  //           })

  //           if(data===null || error || data.length===0){
  //             setnotifications(undefined)
  //             setnotificationBadge(false);
  //           }
  //           else if(data.length>0){
  //             setnotificationBadge(true);
  //             setnotifications(data);
  //             console.log(data);
  //           }

  //           console.log(data,error)
  // }

  // const MarkNotificationASRead = async(notid) =>{
  //           let { data, error } = await supabase.rpc('marknotificationasread', {
  //           notid:notid
  //         })

  //         console.log(error,data);

  //         if(!error){
  //           getNotifications();
  //         }


        
  //}

  useEffect(()=>{

    // const channel = supabase
    //     .channel('table-db-changes')
    //     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Notification', filter: `UserFavrted_ID=eq.${currentuser}`, }, (payload) =>{
    //       console.log(payload)
    //       setnotificationBadge(true);
    //       getNotifications();
    //     }
    //     )
    //     .subscribe()

          getNotifications();

          if(notifications===null || notifications===undefined){
            setnotificationBadge(false);
          }

        },[])
 
  return(notifications!==null && notifications!==undefined)? (
    <div>
      {notifications.map((value,index)=>{
        return(

          <div key={index}
              class="bg-rose-600 text-sm px-4 py-3 text-white sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          >
          <p class="text-center font-medium sm:text-left">
            "{value.proptitle}" - Property was sold
            <br class="sm:hidden" />
            { " " }on {value.datee} at {value.timee.substring(0,5)}
          </p>

            <button onClick={()=>{MarkNotificationASRead(value.notid)}}
              class="mt-4 block rounded-lg bg-white px-5 py-3 text-center text-sm font-medium text-white-600 transition hover:bg-white/90 focus:outline-none focus:ring active:text-indigo-500 sm:mt-0"
              
            >
              Mark as Read
            </button>
          </div>

        )
      })}
    </div>
          
  ):(<div>No notification's at the moment.</div>)
}

export default Notification