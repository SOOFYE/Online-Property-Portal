import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom';

const ownerid = '2e0ef298-f57d-4223-b1c7-14200f2414e0';


function ViewListing() {

    const [listings,setListings] = useState([]);

    useEffect(()=>{

        supabase.rpc('viewlisting', {
            ownerid
        }).then(value=>{
            console.log(value);
            if(value.data!=null)
            setListings(value.data);
            else{
                setListings("No Listings!")
            }})



    },[])

  return (
    <section className="grid grid-cols-3 row-span-5 col-span-10 my-16 gap-5 mx-12 overflow-y-auto">
    {listings.map((value,index)=>{
        return(
            <Link to={"/SingleListing/"+value.propertyid}><div className="group block overflow-hidden mb-4" key={index}>

                <div className="overflow-hidden rounded-3xl">
                    <img
                        alt="Tee"
                        src={value.imagepath}
                        className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-90 sm:h-[350px]"
                        />

                    <div className="relative pt-4">
                        <h3 className="truncate hover:whitespace-normal  font-medium text-sm">
                        {value.city}
                        </h3>
                        <h3 className="truncate hover:whitespace-normal  text-md group-hover:underline group-hover:underline-offset-3 decoration-solid decoration-green-500">
                        {value.address}
                        </h3>

                        <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="font-bold tracking-wider mx-2">PKR {value.price} </span>
                        </p>
                    </div>    
                </div>
            </div></Link>
        )
    })} 
    
  </section>
  )
}

export default ViewListing