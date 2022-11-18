import React,{ useState,useContext } from 'react'
import { supabase } from "../supabaseClient";
import SuccessSpamSent from "./SuccessSpamSent";

import { LoginContext } from '../Contexts/LoginContext';

function SpamForm({showspam,setshowspam,pid}) {

    //const currentuser = "2e0ef298-f57d-4223-b1c7-14200f2414e0";

    const {loggedIn,SetloggedIn,userID,userType,setuserID,setuserType} = useContext(LoginContext);

    const [reason,setreason] = useState("");
    const [showsuccess,setsuccess] = useState('')


    const handleReason = (e)=>{
        setreason(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

  const val = await supabase.auth.getSession();

        supabase.rpc('insertspam', {
        propertyid:pid, 
        reason:reason, 
        reporter:val.data.session.user.id
    }).then((value)=>{

      console.log(value);

        if(value.error===null){
            setsuccess(true);

            setTimeout(()=>{
                setsuccess(false);
                setshowspam(false);
            }, 1500)
        }
        console.log(value);
        setreason("");
    })


    }


  
  
    return(showspam)?(
    <div
  class="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg"
  role="alert"
>
<SuccessSpamSent showsuccess={showsuccess}/>
  <div class="items-center sm:flex">
    <span
      class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
</svg>

    </span>

    <p class="mt-3 text-lg font-medium sm:mt-0 sm:ml-3">
      Report
    </p>
  </div>

  <p class="mt-4 text-gray-500">
    If you feel this listing doesn't follow our community guidelines or is spam, then please report this.
  </p>
 <form onSubmit={handleSubmit}>
  <div class="mt-6 sm:flex">

  <label for="countries_multiple" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a Reason</label>
<select value={reason} onChange={handleReason} required id="countries_multiple" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected value="" disabled>Reason</option>
  <option value="inappropriate">Inappropriate image</option>
  <option value="Description doesn't match">Description doesn't match</option>
  <option value="Price seem's too high">Price seem's too high</option>
  <option value="Seems like a fake listing">Seems like a fake listing</option>
</select>
  </div>

  <div class="mt-6 sm:flex">
    <button
      class="inline-block w-full rounded-lg bg-red-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
    >
      Report
    </button>

    <button type="button" onClick={()=>setshowspam(false)}
      class="mt-3 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:ml-3 sm:w-auto"
    >
      Go Back
    </button>
  </div>
  </form> 
</div>
  ):(<div></div>)
}

export default SpamForm