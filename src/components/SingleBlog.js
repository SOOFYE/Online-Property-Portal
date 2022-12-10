import React from "react";
import { useRef, useContext } from "react";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LoginContext } from "../Contexts/LoginContext";

function SingleBlog() {
  const { loggedIn } = useContext(LoginContext);

  let { blogid } = useParams();

  const [BlogData, setBlogData] = useState([]);
  const [Comm, setcomm] = useState("");
  const [postComment, setPostComment] = useState(true);
  const [replycommentid, setreplycommentid] = useState("");
  const [blogsComments, setblogComments] = useState([]);
  const [blogReplyComments, setBRC] = useState([]);
  const [CommentIDforReply, setCID] = useState([]);

  const ref = useRef(null);
  const repliesref = useRef(null);

  const handeleComment = (e) => {
    setcomm(e.target.value);
  };

  const getBlogData = async () => {
    let { data, error } = await supabase.rpc("getsingleblog", {
      blogid: blogid,
    });
    if (error) console.error(error);
    else {
      console.log(data, error);
      setBlogData(data);
    }
  };

  const submitComment = async () => {
    const val = await supabase.auth.getSession();

    console.log(val);

    supabase
      .from("BlogComments")
      .insert({
        BlogID: blogid,
        UserID: val.data.session.user.id,
        Comment: Comm,
      })
      .then((value) => {
        console.log("commented PosteD: ", value);
        getBlogcomments();
        setcomm("");
      });
  };

  const submitReply = async () => {
    const val = await supabase.auth.getSession();

    supabase
      .from("BlogCommentReply")
      .insert({
        CommentID: CommentIDforReply,
        UserID: val.data.session.user.id,
        Comment: Comm,
      })
      .then((value) => {
        console.log("Reply PosteD: ", value);
        getBlogReplies();
        setcomm("");
        setPostComment(true);
      });
  };

  const getBlogcomments = async () => {
    let { data, error } = await supabase.rpc("getblogcomments", {
      bid: blogid,
    });

    if (error) console.error(error);
    else {
      console.log(data);
      setblogComments(data);
    }
  };

  const getBlogReplies = async () => {
    let { data, error } = await supabase.rpc("getblogreplies", {
      bid: blogid,
    });

    if (error) console.error(error);
    else {
      console.log(data);
      setBRC(data);
    }
  };

  const getmyDate = (da) => {
    let date = new Date(da);

    let mydate =
      "" +
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getFullYear();

    console.log(mydate);

    return mydate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postComment) {
      submitComment();
      getBlogcomments();
    } else {
      submitReply();
      getBlogReplies();
    }
  };

  useEffect(() => {
    getBlogData();
    getBlogcomments();
    getBlogReplies();
  }, []);

  return BlogData !== undefined &&
    BlogData !== null &&
    BlogData.length !== 0 ? (
    <div>
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    class="mr-4 w-16 h-16 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      class="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {BlogData[0].fname} {BlogData[0].lname}
                    </a>
                    <p class="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Published under - {BlogData[0].category}
                      </time>
                    </p>
                    <p class="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime={BlogData[0].writtendate}
                        title="February 8th, 2022"
                      >
                        Published on - {getmyDate(BlogData[0].writtendate)}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {BlogData[0].title}
              </h1>
            </header>
            <p class="lead mb-10 -mt-3 text-lg font-light italic">
              {BlogData[0].metatitle}
            </p>
            <LazyLoadImage
              alt="Les Paul"
              src={BlogData[0].imageurl}
              class="aspect-square w-full  h-[300px] mb-10 rounded-xl object-cover"
            />
            <p class="lead mb-10 -mt-3 text-md font-normal text-justify">
              {BlogData[0].content}
            </p>

            <section class="not-format">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion
                </h2>
              </div>

              {loggedIn ? (
                <form class="mb-6" onSubmit={handleSubmit}>
                  <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label for="comment" class="sr-only">
                      Your comment
                    </label>
                    <textarea
                      ref={ref}
                      id="comment"
                      rows="6"
                      value={Comm}
                      onChange={handeleComment}
                      class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                  </div>
                  {postComment ? (
                    <button
                      type="submit"
                      class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                      Post comment
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        onClick={() => {
                          repliesref.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                      >
                        Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => setPostComment(true)}
                        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </form>
              ) : (
                <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label for="comment" class="sr-only">
                    Your comment
                  </label>
                  <textarea
                    disabled
                    ref={ref}
                    id="comment"
                    rows="6"
                    value={Comm}
                    onChange={handeleComment}
                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Please Signup/Login To comment......"
                  ></textarea>
                </div>
              )}
              <div style={{ "overflow-y": "scroll", height: "750px" }}>
                {blogsComments.length !== 0 &&
                blogsComments !== null &&
                blogsComments !== undefined ? (
                  blogsComments.map((value) => (
                    <div>
                      <article class="p-6 mb-6 text-base bg-gray-100 rounded-lg dark:bg-gray-700">
                        <footer class="flex justify-between items-center mb-2">
                          <div class="flex items-center">
                            <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                              <img
                                class="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough"
                              />
                              {value.fname} {value.lname}{" "}
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                              <time
                                pubdate
                                datetime="2022-02-08"
                                title="February 8th, 2022"
                              >
                                {getmyDate(value.daate)}
                              </time>
                            </p>
                          </div>
                        </footer>
                        <p>{value.comment}</p>
                        <div class="flex items-center mt-4 space-x-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              setPostComment(false);
                              ref.current?.scrollIntoView({
                                behavior: "smooth",
                              });
                              setCID(value.comid);
                              repliesref.current = e.target;
                            }}
                            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                          >
                            <svg
                              aria-hidden="true"
                              class="mr-1 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              ></path>
                            </svg>
                            Reply
                          </button>
                        </div>
                      </article>

                      {blogReplyComments.length !== 0 &&
                      blogReplyComments !== null &&
                      blogReplyComments !== undefined
                        ? blogReplyComments.map((valuee) =>
                            valuee.commid === value.comid ? (
                              <article class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                <footer class="flex justify-between items-center mb-2">
                                  <div class="flex items-center">
                                    <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                      <img
                                        class="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        alt="Jese Leos"
                                      />
                                      {valuee.fname} {valuee.lname}
                                    </p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                      <time
                                        pubdate
                                        datetime="2022-02-12"
                                        title="February 12th, 2022"
                                      >
                                        {getmyDate(valuee.daate)}
                                      </time>
                                    </p>
                                  </div>
                                </footer>
                                <p>{valuee.comment}</p>
                              </article>
                            ) : null
                          )
                        : null}
                    </div>
                  ))
                ) : (
                  <div>No comments Posted!</div>
                )}
              </div>
            </section>
          </article>
        </div>
      </main>
    </div>
  ) : (
    <div></div>
  );
}

export default SingleBlog;
