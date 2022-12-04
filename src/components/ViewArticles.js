import React, { useState,useContext } from 'react'
import { useEffect } from 'react';
import { supabase } from "../supabaseClient";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LoginContext } from '../Contexts/LoginContext';


//const ownerid = '2e0ef298-f57d-4223-b1c7-14200f2414e0';


function ViewArticles() {

    //const {loggedIn,SetloggedIn,userID,userType,setuserID,setuserType} = useContext(LoginContext);


    const [Blogs,setBlogs] = useState([]);
    const [loading,setLoading] = useState("Loading....");


    const ViewBlogs = async ()=>{

      const val = await supabase.auth.getSession();
        let { data, error } = await supabase.rpc('viewblogs', {
          ownerid:val.data.session.user.id
        })
      
      if (error) console.error(error)
      else {console.log(data);
        setBlogs(data); 
    }
}

const deleteBlog = async(bid)=>{
    let { data, error } = await supabase.rpc('deleteblog', {
    blogid:bid
  })

if (error) console.error(error)
else {console.log(data);
    ViewBlogs();}
    
}

    useEffect(()=>{

      setLoading("Loading.....")

      setTimeout(()=>{
        setLoading("No Articles added")
      },3000)

        ViewBlogs();

    },[])
    

  return(Blogs!==undefined && Blogs!==null && Blogs.length!==0)? (

    <div>

<p className="text-7xl font-bold mx-10 my-3">Your Blogs</p>


{Blogs.map((value=>{

  let date = new Date(value.daate);

  return(<article key={value.blogid} class="flex bg-white transition hover:shadow-xl mt-7">
  
  <div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
    <time
      datetime="2022-10-10"
      class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
    >
      <span>{date.getFullYear()}</span>
      <span class="w-px flex-1 bg-gray-900/10"></span>
      <span>{date.toLocaleString('default', { month: 'short' })}{" "}{date.getDate()}</span>
    </time>
  </div>

  <div class="hidden sm:block sm:basis-56">
    
    <LazyLoadImage
    alt="Blog"
    src={value.imageurl}
    class="aspect-square h-full w-full object-cover"
    />
  </div>

  <div class="flex flex-1 flex-col justify-between">
    <div class="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
      <a href="#">
        <h3 class="font-bold uppercase text-gray-900 ">
          {value.title} - <p className="text-xs italic inline">{value.cat}</p>
        </h3>
      </a>

      <p class="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3 italic">
        {value.metatitle}
      </p>

      <p class="mt-5 text-md leading-relaxed text-gray-700 line-clamp-3  truncate">
        <p className="text-xs italic inline">Content:</p> {value.content}
      </p>
    </div>

    <div class="sm:flex sm:items-end sm:justify-end">
      <Link to={"/SingleBlog/"+value.blogid}
        class="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
      >
        Read Blog
      </Link>
    </div>

    <button class="ml-5 mb-2 sm:flex sm:items-end sm:justify-start inline" onClick={()=>deleteBlog(value.blogid)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="w-6 h-6 stroke-white hover:stroke-red-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    </button>
  </div>
</article>)}))}





</div>
  ):(<div className='text-4xl font-md mt-4 mr-4'>{loading}</div>)
}

export default ViewArticles