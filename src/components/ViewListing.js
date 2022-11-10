import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ownerid = '2e0ef298-f57d-4223-b1c7-14200f2414e0';


function ViewListing() {

    const [listings,setListings] = useState([]);

    const viewListing = async()=>{

        const {data,error} = await supabase.rpc('viewlisting', {
            ownerid
        })
            console.log(data);
            if(data!==null)
                setListings(data);
            else
                setListings("No Listings!");    
    }

    const MarkasSold=async(pid)=>{
        let { data, error } = await supabase.rpc('markassold', {
          pid:pid
        })

        console.log(data,error);

        viewListing();
    }

    useEffect(()=>{

        viewListing();

        // supabase.rpc('viewlisting', {
        //     ownerid
        // }).then(value=>{
        //     console.log(value);
        //     if(value.data!=null)
        //     setListings(value.data);
        //     else{
        //         setListings("No Listings!")
        //     }})



    },[])

 return (listings[0]!==undefined)?(
    <section className="grid grid-cols-3 row-span-5 col-span-10 my-16 gap-5 mx-12 overflow-y-auto">
    {listings.map((value,index)=>{
        let location = value.sublocaly1.concat(" ",value.sublocaly2.concat(" ",value.neighbourhoodd))
        return(
            <div className="relative">
            <div class="relative mx-[18rem] my-2  inline-flex items-stretch rounded-md border bg-white">
                        <div class="relative">
                            <button
                            type="button"
                            class="inline-flex h-full items-center justify-center rounded-r-md border-l border-gray-100 px-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                            >
                            <span class="sr-only">Menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                                />
                            </svg>
                            </button>

                            <div
                            class="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg"
                            role="menu"
                            >
                            <div class="p-2">
                                <button type="button"
                                onClick={()=>{MarkasSold(value.propertyid)}}
                                class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                role="menuitem"
                                >
                                Mark as "SOLD"
                                </button>

                                <button
                                    type="submit"
                                    class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                    role="menuitem"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                    </svg>

                                    Delete Product
                                </button>
                            </div>
                            </div>
                        </div>
                </div>




            <Link to={"/SingleListing/"+value.propertyid}><div className="group block overflow-hidden mb-4" key={index}>
            <span class="mx-3 my-2 transition-transform duration-10 group-hover:z-10 group-hover:my-8 group-hover:mx-8 absolute whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-500">{value.status}</span>
                
                <div className="overflow-hidden rounded-3xl">
                
                    <LazyLoadImage
                        alt="property"
                        src={value.imagepath}
                        className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-90 sm:h-[350px]"
                        />
                    <div className="relative pt-4">
                   
                        <h3 className="truncate hover:whitespace-normal  font-medium text-sm">
                        {value.city} 
                        </h3>
                        <h3 className="truncate hover:whitespace-normal  text-md group-hover:underline group-hover:underline-offset-4 decoration-solid decoration-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>{location}
                        </h3>

                        <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="font-bold tracking-wider mx-2">PKR {value.price} </span>
                        
                        </p>

                        <span></span>
                    </div>    
                </div>
            </div>
            </Link>
            </div>  
            
        )
    })} 
    
  </section>
  ):(<div className="text-3xl">Loading...</div>)
}

export default ViewListing