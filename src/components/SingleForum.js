import React from 'react'
import { useRef,useContext } from 'react';
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LoginContext } from "../Contexts/LoginContext";




function SingleForum() {

    const {loggedIn} = useContext(LoginContext);

    const [forumdata,setforumdata] = useState([])

    const [upVoted,setupVoted] = useState(false);
    const [downVoted,setdownVoted] = useState(false);
    const [disableVotes,setdisableVotes] = useState(false);

    const [comment,setcomments] = useState("");
    const [allAnswers,setAnswers] = useState([]);
    const [userUpvotedComments,setUPC] = useState([]);
    const [userDownvotedComments,setDPC] = useState([]);

    const handleComment = (e)=>{setcomments(e.target.value)}

    //let {blogid} = useParams();

    //let forumid = '606db43f-edb2-4e7f-a57f-5d27319d2212'
    let {forumid} = useParams();


    const getforum = async ()=>{
        let { data, error } = await supabase.rpc('getsingleforum', {
            forumid:forumid
        })

if (error) console.error(error)
else {console.log(data); setforumdata(data);}
    }


    const CheckifUpVoted = async()=>{

        const user = await supabase.auth.getSession();

        let { data, error } = await supabase.rpc('checkifupvoted', {
            forumid:forumid, 
            userid:user.data.session.user.id,
        })

        if (error) console.error(error)
        else {console.log(data);setupVoted(data)}

    }
    const CheckifDownVoted = async()=>{

        const user = await supabase.auth.getSession();

        let { data, error } = await supabase.rpc('checkifdownvoted', {
            forumid:forumid, 
            userid:user.data.session.user.id,
        })

        if (error) console.error(error)
        else {console.log(data);setdownVoted(data)}
       
    }

    const DeletedownVote = async ()=>{

        const user = await supabase.auth.getSession();

        let { data, error } = await supabase.rpc('deletedownvote', {
            forumid:forumid, 
            userid:user.data.session.user.id
        })

        if (error) {console.error(error)}
        else {console.log(data);setdownVoted(data);
            CheckifUpVoted();}


    }

    const Deleteupvote = async ()=>{
        const user = await supabase.auth.getSession();

        let { data, error } = await supabase.rpc('deleteupvote', {
            forumid:forumid, 
            userid:user.data.session.user.id
        })

        if (error) {console.error(error)}
        else {console.log(data);setupVoted(data);
            CheckifDownVoted();}
    }

    const MarkdownVote = async ()=>{
        setdisableVotes(true)

        if(downVoted){
            await DeletedownVote();
            setdisableVotes(false);
            return;
        }

        else{
            const user = await supabase.auth.getSession();
    
            let { data, error } = await supabase.rpc('setdownvote', {
                forumid:forumid, 
                userid: user.data.session.user.id
            })
    
            if (error) {console.error(error)}
            else {console.log(data);setdownVoted(data);setdisableVotes(false);
                CheckifUpVoted();}
    
           }

    }

    const MarkupVote = async ()=>{
        setdisableVotes(true)

        if(upVoted){
            await Deleteupvote();
            setdisableVotes(false);
            return;
        }

        else{
        const user = await supabase.auth.getSession();

        let { data, error } = await supabase.rpc('setupvote', {
            forumid:forumid, 
            userid: user.data.session.user.id
        })

        if (error) {console.error(error)}
        else {console.log(data);setupVoted(data);setdisableVotes(false);
            CheckifDownVoted();}

        }


    }

    const getAnswers = async()=>{
        let { data, error } = await supabase.rpc('getforumanswers', {
            forumid:forumid
        })

        if (error) console.error(error)
        else {console.log(data);setAnswers(data)}
    }

    const getAnswersforcount = async()=>{
        let { data, error } = await supabase.rpc('getforumanswersforcount', {
            forumid:forumid
        })

        if (error) console.error(error)
        else {console.log(data);setAnswers(data)}
    }



    const postAnswer = async(e)=>{
        e.preventDefault();

        const user = await supabase.auth.getSession();

        const {data,error} = await supabase.from('ForumComments').insert({
            Forum_ID: forumid,
            UserID: user.data.session.user.id,
            Comment: comment
        })

        if(error===null){
            console.log(data,"Comment POSTED!");
            setcomments("");
            getAnswers();
        }

        else{
            console.log(error);

        }

    }

    const GetUsersDownvotesonComments = async ()=>{
        const user = await supabase.auth.getSession();

        let { data, error } = await supabase.rpc('getanswersdownvotes', {
            forumid:forumid, 
            userid:user.data.session.user.id
        })

    if (error) console.error(error)
    else {console.log(data);setDPC(data);}
    }

    const GetUsersUpvotesonComments = async ()=>{
        const user = await supabase.auth.getSession();

        let { data, error } = await supabase.rpc('getanswersupvotes', {
            forumid:forumid, 
            userid:user.data.session.user.id
        })

    if (error) console.error(error)
    else {console.log(data);setUPC(data);}
    }

    const MarkUpVoteComment = async (commentIDD)=>{
        //if markedthen delete

        if(userUpvotedComments.find(e => e.cid===commentIDD)){
            const { error } = await supabase.from('ForumCommentUpVote')
            .delete()
            .eq('Comment_ID', commentIDD)

            if(error){console.log(error);}

            GetUsersUpvotesonComments();
            GetUsersDownvotesonComments();
            getAnswersforcount();

            return;
        }

        const user = await supabase.auth.getSession();

        let { data, error } = await supabase
        .rpc('setupvotecomment', {commentid: commentIDD,userid:user.data.session.user.id})

            if (error) console.error(error)
            else {console.log(data,"upvoted");GetUsersUpvotesonComments();GetUsersDownvotesonComments();getAnswersforcount()}

    }


    const MarkDownVoteComment = async (commentID)=>{

        if(userDownvotedComments.find(e => e.cid===commentID)){
            const { error } = await supabase.from('ForumCommentDownVote')
            .delete()
            .eq('Comment_ID', commentID)

            if(error){console.log(error);}

            GetUsersDownvotesonComments();
            GetUsersUpvotesonComments();
            getAnswersforcount();

            return;
        }


        const user = await supabase.auth.getSession();

        let { data, error } = await supabase.rpc('setdownvotecomment', {
            commentid:commentID, 
            userid:user.data.session.user.id,
        })

        if (error) console.error(error)
        else {console.log(data,"DOWNVOTED");GetUsersDownvotesonComments();GetUsersUpvotesonComments();getAnswersforcount()}

    }

    useEffect(()=>{

        getforum();
        CheckifUpVoted();
        CheckifDownVoted();
        getAnswers();
        GetUsersDownvotesonComments(); //get users all downvotes of comments.
        GetUsersUpvotesonComments(); //get users all upvotes of comments.

    },[])

    



  return(forumdata!==null && forumdata.length>0 && forumdata!==undefined)?(
<div>
    <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
  <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header class="mb-4 lg:mb-6 not-format">
              {/* <address class="flex items-center mb-6 not-italic">
                  <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img class="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos"/>
                      <div>
                          <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">Jese Leos</a>
                          <p class="text-base font-light text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p>
                          <p class="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
                      </div>
                  </div>
              </address> */}
              

<div class='flex flex-row'>

              <div class="flex flex-col mr-5">

              <button disabled={!loggedIn} type='button' onClick={()=>MarkupVote()}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={(upVoted===false)?("w-9 h-9 hover:fill-green-900"):("w-9 h-9 fill-green-900 hover:fill-none")}>
                 <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg></button>

              <p className='text-lg text-center font-black'>{forumdata[0].uvotes - forumdata[0].dvotes}</p>


              <button disabled={!loggedIn} type='button' onClick={()=>MarkdownVote()}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={(downVoted===false)?("w-9 h-9 hover:fill-red-900"):("w-9 h-9 fill-red-900 hover:fill-none")}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
              </svg></button>

              </div> 
            
              
              <div class="">
              <h1 class="break-keep mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{forumdata[0].question}</h1>
              </div>
</div>


                
              <div class="grid grid-cols-2 gap-4">
              <p className='text-md font-black'>Asked on: {new Date(forumdata[0].date).getDate() + " " +new Date(forumdata[0].date).toLocaleString('default', { month: 'short' }) + " "+new Date(forumdata[0].date).getFullYear() } </p>
              <p className='text-md font-black'>Asked by: {forumdata[0].fname + " " + forumdata[0].lname } </p>
              </div>
          <hr></hr>
          
          </header>
          <section class="not-format">
              <div class="flex justify-between items-center mb-6">
                  <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Answers</h2>
              </div>
              {(!forumdata[0].closed)?(<form onSubmit={postAnswer}class="mb-6">
                  <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label for="comment" class="sr-only">Your comment</label>
                      <textarea disabled={!loggedIn} value={comment} onChange={handleComment} id="comment" rows="6"
                          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                          placeholder={(loggedIn)?("Write your answer..."):("Please Login to Answer.")} required></textarea>
                  </div>

                  <button disabled={!loggedIn}
  class="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
  type='submit'
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
    Submit Answer
  </span>
</button>

              </form>):(<div><p className='text-rose-600 text-2xl font-semibold align-center '>This Question is Closed By the Asker.</p></div>)}

            {(allAnswers.length>0 && allAnswers!==null && allAnswers!==undefined)?(allAnswers.map((value,index)=>{

                let date = new Date(value.daate);

                return(

                    <div class='flex flex-row' key={value.comid}>

              <div class="flex flex-col mr-3 mt-5">

              <button disabled={!loggedIn} onClick={()=>MarkUpVoteComment(value.comid)} type='button' ><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={(!userUpvotedComments.find(e => e.cid===value.comid))?("w-6 h-6 hover:fill-green-900"):("w-6 h-6 fill-green-900 hover:fill-none")}>
                 <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg></button>

              <p className='text-md text-center font-black'>{value.uvotes-value.dvotes}</p>


              <button disabled={!loggedIn} onClick={()=>MarkDownVoteComment(value.comid)} type='button' ><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={(!userDownvotedComments.find(e => e.cid===value.comid))?("w-6 h-6 hover:fill-red-900"):("w-6 h-6 fill-red-900 hover:fill-none")}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
              </svg></button>

              </div> 

             
              <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                  <footer class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                          <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                                  class="mr-2 w-6 h-6 rounded-full"
                                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                  alt="Michael Gough"/>{value.fname}{" "}{value.lname}</p>
                          <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                                  title="February 8th, 2022">{date.getDate()}{" "}{date.toLocaleString('default', { month: 'short' })}{" "}{date.getFullYear()}</time></p>
                      </div>
                  </footer>
                  <p>{value.comment}</p>
                  {/* <div class="flex items-center mt-4 space-x-4">
                      <button type="button"
                          class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                          <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                          Reply
                      </button>
                  </div> */}
                 
              </article>
              
              </div>


                )
            })):(<div>No Answers posted yet....</div>)}
              
              {/* <article class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                  <footer class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                          <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                                  class="mr-2 w-6 h-6 rounded-full"
                                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                  alt="Jese Leos"/>Jese Leos</p>
                          <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-12"
                                  title="February 12th, 2022">Feb. 12, 2022</time></p>
                      </div>
                      <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button">
                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                              </path>
                          </svg>
                          <span class="sr-only">Comment settings</span>
                      </button>

                      <div id="dropdownComment2"
                          class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconHorizontalButton">
                              <li>
                                  <a href="#"
                                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                              </li>
                              <li>
                                  <a href="#"
                                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                              </li>
                              <li>
                                  <a href="#"
                                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                              </li>
                          </ul>
                      </div>
                  </footer>
                  <p>Much appreciated! Glad you liked it ☺️</p>
                  <div class="flex items-center mt-4 space-x-4">
                      <button type="button"
                          class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                          <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                          Reply
                      </button>
                  </div>
              </article> */}
          </section>
      </article>
  </div>
</main>

</div>


    
  ):(<div>Loading....</div>)


}
export default SingleForum