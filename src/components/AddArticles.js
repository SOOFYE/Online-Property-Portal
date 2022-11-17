import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function AddArticles() {

  const [selectedImage, setImage] = useState(undefined);
  const [Heading,setHeading] = useState("");
  const [metaTitle,setmetaTitle] = useState("");
  const [content,setContent] = useState("");
  const [category,setCategory] = useState("");
  

  const handleHeading = (e)=>{
    setHeading(e.target.value);
  }
  const handlemetaTitle = (e)=>{
    setmetaTitle(e.target.value);
  }
  const handleContent = (e)=>{
    setContent(e.target.value);
  }
  const handleCategory = (e)=>{
    setCategory(e.target.value);
  }

  const Getimageurl = (imagepath) =>{
    return new Promise(function(resolve,reject){
      const { data } = supabase.storage.from('blog-bucket').getPublicUrl(imagepath)
      if(data!=null)
      resolve(data.publicUrl);
      else
      reject('Image Path invalid!');
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();


    supabase.storage.from('blog-bucket').upload(`UID${selectedImage.name}`+Math.random(),selectedImage)
    .then(value=>{

      console.log("SENT!: ",value);

      Getimageurl(value.data.path).then((value)=>{
        console.log("GOT URLL ",value);

        supabase.from('Blog')
        .insert({
          Author_ID: '2e0ef298-f57d-4223-b1c7-14200f2414e0',
          Title: Heading,
          MetaTitle: metaTitle,
          Category: category,
          Content: content,
          ImageUrl: value,
        }).then((value)=>{
          console.log("DATA SAVED",value);
        })


      })




    })


  }
  return (
    <div className="col-span-12 px-4 py-14 sm:px-6 lg:px-8">
      <div className="">
        <h1 className="text-center text-2xl font-bold text-rose-600 sm:text-3xl">
          Lets Create A New Article!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          All details are <b>necessary</b>
        </p>

        <form onSubmit={handleSubmit}
        className="mt-6  mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
          <p className="text-xl font-semibold font-medium underline dark:text-white decoration-gray-500 decoration-wavy">
            Article Details
          </p>

          <div>
            <label
              for="ArticleHeading"
              class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="ArticleHeading"
                placeholder="Heading"
                class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                value={Heading}
                onChange={handleHeading}
                required
              />

              <span class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Article Heading
              </span>
            </label>
          </div>

          <div>
            <label
              for="MetaTitle"
              class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="MetaTitle"
                placeholder="MetaTitle"
                class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                value={metaTitle}
                onChange={handlemetaTitle}
                required
              />

              <span class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                MetaTitle
              </span>
            </label>
          </div>

  <div>
      <label
    for="Category"
    class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <select
      
      id="Category"
      placeholder="Category"
      class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={category}
      onChange={handleCategory}
      required
    >
    <option selected value="">Choose a category</option>
    <option value="Business">Business</option>
    <option value="Politics">Politics</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Technology">Technology</option>
    <option value="Religion">Religion</option>
    </select>

    <span
      class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
    >
      Category
    </span>
  </label>
  </div>

          <div>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Content</label>
          <textarea 
          id="message" 
          rows="4" 
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Content..."
          value={content}
          onChange={handleContent}
          ></textarea>
          </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 " for="file_input">Upload Property Photo</label>
          <input onChange={(e)=>{setImage(e.target.files[0]);console.log(e.target.files[0])}} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=' .png, .jpeg, .jpg' required/>
        </div>

        <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Create Article
        </button>


        </form>
      </div>
    </div>
  );
}

export default AddArticles;
