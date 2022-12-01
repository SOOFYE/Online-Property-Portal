import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import { supabase } from '../supabaseClient'
import { useNavigate,Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Signin() {

  const {loggedIn,SetloggedIn,userID,userType,setuserID,setuserType} = useContext(LoginContext);

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [successMessage,setSuccessMessage] = useState("");

  const handleEmail=(e)=>{setEmail(e.target.value)};
  const handlePassword=(e)=>{setPassword(e.target.value)};
   



    const login = async(e)=>{

      e.preventDefault();

      const { user, session, error } =  await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      console.log(user,session,error);

      if(error===null){
        getSessions();
      }
      else{
        console.log(error.message);
        setErrorMessage(error.message);
      }

      


    }

    const getSessions = async()=>{
      const { data, error } = await supabase.auth.getSession();
      if(error===null&&data.session!==null){
        setuserID(data.session.user.id);
        setErrorMessage(null);
        setSuccessMessage("Logged in")
        setuserType("Member");
        SetloggedIn(true);

        setTimeout(()=>{
          navigate("/HomePage")
        },1500)
        

      }
      else{
        SetloggedIn(false);
        setSuccessMessage(null);
        setErrorMessage(error.message);
        navigate("/signin");
      }
      console.log(data.session.user.id,error);
    }

    // const signOut = async()=>{
    //   const { error } = await supabase.auth.signOut();
    //   getSessions();
    // }

  
    return (
      
      <section className="relative flex flex-wrap lg:h-screen lg:items-center my-8">
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Let's Sign in</h1>
  
      </div>
  
      <form onSubmit={login} className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
          <label for="email" className="sr-only">Email</label>
  
          <div className="relative">
            <input
            value={email}
            onChange={handleEmail}
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
              required
            />
  
            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <div>
          <label for="password" className="sr-only">Password</label>
          <div className="relative">
            <input
            value={password}
              onChange={handlePassword}
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              required
            />
            {(errorMessage)?(<div role="alert" className=" mt-3 col-span-6 mt-8 sm:flex sm:items-center sm:gap-4 rounded border-l-14 border-red-500 bg-red-50 p-4">
                  <strong className="block font-medium text-red-700"> Something went wrong: </strong>

                    <p className="mt-1 text-sm text-red-700">
                    {errorMessage}
                    </p>
                  </div>):(successMessage)?(<div role="alert" className=" mt-3 col-span-6 sm:flex sm:items-center sm:gap-4 rounded border-l-14 border-green-500 bg-green-50 p-4">
              <strong className="block font-medium text-green-700"> Success! </strong>

                <p className="mt-1 text-sm text-green-700">
                {successMessage}
                </p>
              </div>):(<div></div>)}
  
            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
               
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <Link to="/register" className="underline">Sign up</Link>
          </p>
  
          <button
            type="submit"
            className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  
    <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
   
        <LazyLoadImage
          alt="property"
          src="https://ffixephepheoizedsluo.supabase.co/storage/v1/object/public/properties/vu-anh-TiVPTYCG_3E-unsplash.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          />
    </div>
  </section>
    )
}

export default Signin