import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom';

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
                        <h3 className="truncate hover:whitespace-normal  text-md group-hover:underline group-hover:underline-offset-4 decoration-solid decoration-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>{location}
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
  ):(<div className="text-3xl">Loading...</div>)
}

export default ViewListing