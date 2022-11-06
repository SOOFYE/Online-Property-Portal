import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useParams, } from "react-router-dom";
import PhonePopup from "./PhonePopup";
import PendingError from "./PendingError";

function SingleListing() {
  //const propertyid = "e5e35203-ba6a-406b-aa95-4b45eb98c0a8"; //send trhoguh url

  const currentuser = "2e0ef298-f57d-4223-b1c7-14200f2414e0" //we will have this when user logges in

  const [listing, setListing] = useState([]);

  const [fname,setfname] = useState("");
  const [lname,setlname] = useState("");
  const [email,setEmail] = useState("");
  const [fulllname,setfullname] = useState("");
  const [showPopup,setpopup] = useState(false);

  let {propertyid} = useParams();

  useEffect(() => {
    //if lisiting blocked, or pending, or rejected, then redirect user to error page

    supabase
      .rpc("getsinglelisting", {
        propertyid,
      })
      .then((value) => {
        setListing(value.data);
        console.log(value);
      });

      supabase.rpc('getloggedinuser', {
        currentuser
      }).then(value=>{
        console.log(value);
        setfname(value.data[0].userfname);
        setlname(value.data[0].userlname);
        setEmail(value.data[0].useremail);
        let fullname = fname.concat(" ",lname)
        setfullname(fullname);
      })



  }, []);

  return((listing[0] !== undefined && listing[0].propertystatus==='Active')||(listing[0] !== undefined && currentuser===listing[0].ownerid ))?(

    
    
    <section>
    <PhonePopup showpopup={showPopup} setpopup={setpopup} phonenum={listing[0].ownersphone}/>
      <div class="relative mx-auto max-w-screen-xl px-4 py-8">
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
            <img
              alt="Les Paul"
              src={listing[0].imageurl}
              class="aspect-square w-full rounded-xl object-cover"
            />
          </div>

          <div class="sticky top-0">
            <strong class="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
              {listing[0].propertypurpose}
            </strong>

            <div class="mt-8 flex justify-between">
              <div class="max-w-[35ch]">
                <h1 class="text-2xl font-bold">{listing[0].propertytitle}</h1>

                <p className="mt-0.5 text-sm font-light">
                  {listing[0].propertycity},
                  <p className="">{listing[0].propertyaddress}</p>
                </p>

                <hr className="mt-4"></hr>
              </div>

              <p className="text-lg font-bold">
                PKR {listing[0].propertyprice}
              </p>
            </div>

            <div className="mt-4 font-light">
              {listing[0].propertydescription}
            </div>

            <div class="mt-8">
              <legend className="mb-1 text-sm font-medium">
                Property Type
              </legend>
              <p className="mt-0.2 mb-3 mx-1 text-sm font-light">
                {listing[0].propertytype}
              </p>

              <legend className="mb-1 text-sm font-medium">
                Area Units (sqrft)
              </legend>
              <p className="mt-0.2 mb-3 mx-1 text-sm font-light">
                {listing[0].propertyunits}
              </p>

              <legend className="mb-1 text-sm font-medium">
                Occupancy Status
              </legend>
              <p className="mt-0.2 mb-3 mx-1 text-sm font-light">
                {listing[0].ocupstatus}
              </p>

              {(currentuser!==listing[0].ownerid)?(<article class="rounded-lg border border-gray-100 p-4 shadow-sm transition hover:shadow-lg sm:p-6">
              <span class="inline-block rounded bg-gray-600 p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>

                <a href="#">
                  <h3 class="mt-0.5 mb-3 text-lg font-medium text-gray-900">
                    Interested? Get in touch with us.
                  </h3>
                </a>

                <form>

                <div className="mb-2">

                  <label
                    for="UserEmail"
                    class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <span class="text-xs font-medium text-gray-700">
                      {" "}
                      Email{" "}
                    </span>

                    <input
                      type="email"
                      id="UserEmail"
                      placeholder="anthony@rhcp.com"
                      value={email}
                      className=" mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"

                    />
                  </label>
                  </div>

                  <div className="mb-3">
                  <label
                    for="UserEmail"
                    class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <span class="text-xs font-medium text-gray-700">
                      {" "}
                      Full Name{" "}
                    </span>

                    <input
                      type="text"
                      id="UserEmail"
                      value = {fulllname}
                      placeholder="Anthony Raymens"
                      className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />
                    </label>
                    </div>

                    <div className="mb-3">
                  <label
                    for="UserEmail"
                    class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <span class="text-xs font-medium text-gray-700">
                      {" "}
                      Message{" "}
                    </span>

                    <textarea
             
              id="message"
              rows="4"
              class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Write your message to this property's owner"
              required
            ></textarea>

                    </label>
                    </div>

                    <div className='grid grid-cols-3 justify-items-stretch' >
                    <div></div>
                    
                                            <button type="button"
                        className="col-span-1 justify-self-end group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                        onClick={()=>setpopup(true)}
                        >
                        <span
                            class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
</svg>


                        </span>

                        <span className="text-sm font-medium transition-all group-hover:mr-4">
                            Call
                        </span>
                        </button>
                        
                        <button
                        className=" col-span-1 mx-5 justify-self-start group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        
                        >
                        <span
                            class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
</svg>

                        </span>

                        <span class="text-sm font-medium transition-all group-hover:mr-4">
                            Message
                        </span>
                        </button>
                    </div>



                </form>

                <p class="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dolores, possimus pariatur animi temporibus
                  nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                  quidem, mollitia itaque minus soluta, voluptates neque
                  explicabo tempora nisi culpa eius atque dignissimos. Molestias
                  explicabo corporis voluptatem?
                </p>

                <a
                  href="#"
                  class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  Find out more
                  <span
                    aria-hidden="true"
                    class="block transition group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </a>
              </article>):(<div className="my-12">
              <Link to='/MemberPortal/ViewListing'
  className="flex items-center justify-center rounded-xl border-4 border-black bg-green-100 px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50"
  
>
  View my other listings <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
</svg>

</Link></div>)}
            </div>
          </div>
        </div>
      </div>
      
    </section>
  
  ) : (listing[0]!==undefined && listing[0].propertystatus==="Pending")?(
    <PendingError/>
  ):(<div>Loading</div>)
}

export default SingleListing;
