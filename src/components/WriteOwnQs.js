import React, {useState} from 'react'

import { supabase } from '../supabaseClient'

import { BrowserRouter,Routes, Route, Link, useNavigate } from "react-router-dom";

function WriteOwnQs() {

  const navigate = useNavigate();

    const [question,setQuestion] = useState("");

    const handleQuestion = (e)=>{setQuestion(e.target.value)}

    


    const postQuestion = async (e)=>{

        e.preventDefault();

        const value = await supabase.auth.getSession()

        const {data,error} = await supabase.from('Forum').insert({

            Asker_ID: value.data.session.user.id,
            Question: question,
            UpVotes: 0,
            DownVotes: 0,
            isClosed: false

        });



        if(error===null){
            console.log("Question saved!",data);
            navigate("/MemberPortal/MyQuestions")
        }
        else{
            console.log(error);
        }
    }

  return (

    <div>

<form onSubmit={postQuestion} className='mt-10'>

    <label
      for="title"
      className="pr-10 text-xl font-medium "
    >
     Ask whats on your mind.
    </label>
    <textarea
    value={question}
    onChange={handleQuestion}
      id="message"
      rows="4"
      class="mt-2 block p-2.5 w-[700px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Your Question."
      required
    ></textarea>

<button
  class="mt-4  group relative inline-flex items-center overflow-hidden rounded bg-rose-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
 
>
  <span
    class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4"
  >
    <svg
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </span>

  <span class="text-sm font-medium transition-all group-hover:mr-4">
    Post
  </span>
</button>

    </form>
  </div>
  )
}

export default WriteOwnQs