import React from 'react'
import { useState,useEffect } from 'react'
import { supabase } from "../supabaseClient";
import SingleForum from './SingleForum';

function BrowseForum() {


    const [forums,setforums] = useState([]);
    const [Search,setSearch] = useState("");



    const handleSearch = (e)=>{
        setSearch(e.target.value);
      }  

    const getforums = async ()=>{
        
        let { data, error } = await supabase
        .rpc('browseforums', {
        search:Search
        })

        if (error) console.error(error)
        else {
            console.log(data);
            setforums(data);}

    }  



    useEffect(()=>{
         getforums();
    },[])



  return(forums.length>0 && forums!==undefined && forums!==null)? (
    <div>

<div className='my-3 mb-4'>

    <div class="flex">
        <div class="relative w-full ml-3 mr-2">
            <input value={Search} onChange={handleSearch}  type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Look up on any questions you have....." />
            <button onClick={()=>getforums()} type="button" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span class="sr-only">Search</span>
            </button>
        </div>
    </div>



    </div>



<div>
{(forums.map((value,index)=>{

    let date = new Date(value.date);

    return(<article key={value.forumid}
  class="mt-5 rounded-xl bg-gradient-to-r from-red-300 via-blue-500 to-rose-600 p-0.5 shadow-xl transition hover:shadow-sm"
>
  <div class="rounded-[10px] bg-white p-4 !pt-15 sm:p-6">
    <p class="block text-xs text-gray-500">
    {date.getDate()}{" "}{date.toLocaleString('default', { month: 'short' })}{" "}{date.getFullYear()}
    </p>

    <a href="#">
      <h3 class="mt-0.5 text-lg font-medium text-gray-900">
        {value.question}
      </h3>
    </a>

     <div class="mt-4 flex flex-wrap gap-1">
      <span
        class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-rose-600"
      >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="5" stroke="currentColor" class="inline w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
</svg> <p class='inline font-bold'>{value.upvote}</p>

      </span>

      <span
        class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-rose-600"
      >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="5" stroke="currentColor" class="inline w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
</svg>
 <p class='inline font-bold'>{value.downvote}</p>
      </span>

      <span
        class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-rose-600"
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="inline w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>

 <p class='ml-1 inline font-bold'>0</p>
      </span>



    </div> 
  </div>
</article>)

}))}

<SingleForum/>
</div>    


</div>
  ):(<div>No Forums Yet...</div>)
}

export default BrowseForum