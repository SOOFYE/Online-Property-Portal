import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import { Link } from "react-router-dom";

function MyQuestions() {
  const [forums, setforums] = useState([]);
  const [Search, setSearch] = useState("");
  const [loading, setLoading] = useState("Loading....");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getforums = async () => {
    let user = await supabase.auth.getSession();

    let { data, error } = await supabase.rpc("browsemyforums", {
      userid: user.data.session.user.id,
      search: Search,
    });

    if (error) console.error(error);
    else {
      console.log(data);
      setforums(data);
    }
  };

  const CloseQuestion = async (fid) => {
    const { error } = await supabase
      .from("Forum")
      .update({ isClosed: true })
      .eq("Forum_ID", fid);

    console.log(error);

    getforums();
  };

  const OpenQuestion = async (fid) => {
    const { error } = await supabase
      .from("Forum")
      .update({ isClosed: false })
      .eq("Forum_ID", fid);

    console.log(error);

    getforums();
  };

  // const deleteQuestion = async (id)=>{
  //     const {error} = await supabase.from('Forum').delete().eq('Forum_ID', id)

  //     console.log(error);

  //     getforums();
  // }

  useEffect(() => {
    setLoading("Loading.....");

    setTimeout(() => {
      setLoading("No Forum's Found");
    }, 3000);

    getforums();
  }, []);

  return forums.length > 0 && forums !== undefined && forums !== null ? (
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 mr-[500px]">
      <div className="my-3 mb-4 ">
        <div class="flex">
          <div class="relative w-full ml-3 mr-2">
            <input
              value={Search}
              onChange={handleSearch}
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Look up on any questions you have....."
            />
            <button
              onClick={() => getforums()}
              type="button"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-y-scroll h-[700px]">
        {forums.map((value, index) => {
          let date = new Date(value.date);

          return (
            <article
              key={value.forumid}
              class="overflow-y-auto mt-5 rounded-xl bg-gradient-to-r from-red-300 via-blue-500 to-rose-600 p-0.5 shadow-xl transition hover:shadow-sm"
            >
              <div class="rounded-[10px] bg-white p-4 !pt-15 sm:p-6">
                <p class="block text-xs text-gray-500">
                  {date.getDate()}{" "}
                  {date.toLocaleString("default", { month: "short" })}{" "}
                  {date.getFullYear()}
                </p>

                <Link to={"/SingleForum/" + value.forumid}>
                  <h3 class="mt-0.5 text-lg font-medium text-gray-900">
                    {value.question}
                  </h3>
                </Link>

                <div class="mt-4 flex flex-wrap gap-1">
                  <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-rose-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="5"
                      stroke="currentColor"
                      class="inline w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                      />
                    </svg>{" "}
                    <p class="inline font-bold">{value.upvote}</p>
                  </span>

                  <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-rose-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="5"
                      stroke="currentColor"
                      class="inline w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                      />
                    </svg>
                    <p class="inline font-bold">{value.downvote}</p>
                  </span>
                </div>

                <div çlassName="mt-5">
                  {value.isclose === false ? (
                    <button
                      onClick={() => CloseQuestion(value.forumid)}
                      class="mt-5 group relative inline-flex items-center overflow-hidden rounded bg-rose-200 px-8 py-2 text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                      <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
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
                        Close Question
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => OpenQuestion(value.forumid)}
                      class="mt-5 group relative inline-flex items-center overflow-hidden rounded bg-green-200 px-8 py-2 text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                      <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
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
                        Open Question
                      </span>
                    </button>
                  )}

                  {/* <button onClick={()=>deleteQuestion(value.forumid)}class=" mt-3 sm:flex sm:items-end sm:justify-start inline" >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="w-6 h-6 stroke-white hover:stroke-red-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  </button> */}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="my-3 mb-4">
      <div class="flex">
        <div class="relative w-full ml-3 mr-2">
          <input
            value={Search}
            onChange={handleSearch}
            type="search"
            id="search-dropdown"
            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Look up on any questions you have....."
          />
          <button
            onClick={() => getforums()}
            type="button"
            class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      <div className="text-4xl font-md mt-4 mr-4">{loading}</div>)
    </div>
  );
}

export default MyQuestions;
