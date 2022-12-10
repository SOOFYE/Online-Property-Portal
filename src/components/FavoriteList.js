import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import ReactTooltip from "react-tooltip";

import { numberWithCommas } from "../Functions/numberWithCommas";

//const currentUser = '2e0ef298-f57d-4223-b1c7-14200f2414e0';

function FavoriteList() {
  const [listings, setListings] = useState([]);

  const viewListing = async () => {
    const val = await supabase.auth.getSession();

    let { data, error } = await supabase.rpc("viewfavorites", {
      useriid: val.data.session.user.id,
    });

    if (error) console.error(error);
    else {
      console.log(data);
      setListings(data);
    }
  };

  useEffect(() => {
    viewListing();
  }, []);

  return listings[0] !== undefined ? (
    <div>
      <p className="text-7xl font-bold mx-10 my-3">Your Favorites</p>
      <section className="grid grid-cols-3 row-span-5 col-span-10 my-16 gap-5 mx-12 overflow-y-auto">
        {listings.map((value, index) => {
          let location = value.sublocaly1.concat(
            " ",
            value.sublocaly2.concat(" ", value.neighbourhoodd)
          );
          return (
            <div className="relative">
              <Link to={"/SingleListing/" + value.propertyid}>
                <div className="group block overflow-hidden mb-4" key={index}>
                  <span class="mx-3 my-2 transition-transform duration-10 group-hover:z-10 group-hover:my-8 group-hover:mx-8 absolute whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-500">
                    {value.status}
                  </span>

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
                      <h3 className="truncate hover:whitespace-normal  font-medium text-lg">
                        {value.title}
                      </h3>
                      <h3 className="truncate hover:whitespace-normal  text-md group-hover:underline group-hover:underline-offset-4 decoration-solid decoration-indigo-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 inline "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        {location}
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="font-bold tracking-wider mx-2">
                          PKR {numberWithCommas(value.price)}{" "}
                        </span>
                      </p>

                      <span></span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  ) : (
    <div>No Listings are favorited by you.</div>
  );
}

export default FavoriteList;
