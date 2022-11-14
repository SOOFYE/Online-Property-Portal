import React, { useState } from 'react'
import { useEffect } from 'react';
import { supabase } from "../supabaseClient";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';



function BrowseBlog() {

    const [Blogs,setBlogs] = useState([]);
    const [Search,setSearch] = useState("");
    const [category,setCategory] = useState("All");

    const handleCategory = (e)=>{
        setCategory(e.target.value);
      }

    const handleSearch = (e)=>{
        setSearch(e.target.value);
      }  



    const browseBlogs = async ()=>{
        let { data, error } = await supabase.rpc('browswblogs', {
            category:category, 
            search:Search
        })

            if (error) console.error(error)
            else {console.log(data);
              setBlogs(data)}
    }

    useEffect(()=>{

        browseBlogs();
    },[])
    

  return(Blogs!==undefined && Blogs!==null && Blogs.length!==0)? (

    <div>


    <div className='my-3 mb-4'>

    <div class="flex">
        <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
        
        <select
            value={category}
            onChange={handleCategory}
            id="Category"
            placeholder="Category"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
    >
    <option selected value="All">All</option>
    <option value="Business">Business</option>
    <option value="Politics">Politics</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Technology">Technology</option>
    <option value="Religion">Religion</option>
    </select>

        <div class="relative w-full">
            <input value={Search} onChange={handleSearch} type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Articles/Blogs..." />
            <button onClick={()=>browseBlogs()} type="button" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span class="sr-only">Search</span>
            </button>
        </div>
    </div>



    </div>

{Blogs.map((value=>{

  let date = new Date(value.daate);

  return(<article class="flex bg-white transition hover:shadow-xl">
  
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
  </div>
</article>)}))}





</div>
  ):(<div>No Blogs!</div>)
}

export default BrowseBlog