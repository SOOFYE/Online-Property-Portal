import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import ReactTooltip from "react-tooltip";

import { numberWithCommas } from "../Functions/numberWithCommas";

import { LoginContext } from "../Contexts/LoginContext";

//const ownerid = '2e0ef298-f57d-4223-b1c7-14200f2414e0';

function ViewListing() {
  const { loggedIn, SetloggedIn, userID, userType, setuserID, setuserType } =
    useContext(LoginContext);

  const [listings, setListings] = useState([]);

  const [showOptions, setOptions] = useState(false);

  const [loading, setLoading] = useState("Loading....");

  const viewListing = async () => {
    const value = await supabase.auth.getSession();

    const { data, error } = await supabase.rpc("viewlisting", {
      ownerid: value.data.session.user.id,
    });
    console.log(data, error);
    if (data !== null) {
      setListings(data);
    } else if (data === null) setListings(null);
    else if (error) setListings(undefined);
  };

  const MarkasSold = async (pid) => {
    let { data, error } = await supabase.rpc("markassold", {
      pid: pid,
    });

    console.log(data, error);

    viewListing();
  };

  const DeleteProperty = async (pid) => {
    let { data, error } = await supabase.rpc("deleteproperty", {
      pid: pid,
    });

    if (error) console.error(error);
    else {
      console.log(data);
      viewListing();
    }
  };

  const submit = (pid) => {
    confirmAlert({
      title: "Confirm to mark as Sold",
      message: "Are you sure to do this. You cannot undo after this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => MarkasSold(pid),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const submit2 = (pid) => {
    confirmAlert({
      title: "Confirm to Delete this Property",
      message: "Are you sure to do this. You cannot undo after this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => DeleteProperty(pid),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    setLoading("Loading.....");

    setTimeout(() => {
      setLoading("No Properties added ");
    }, 3000);

    setListings([]);

    viewListing();
  }, []);

  return listings !== undefined && listings !== null ? (
    <div>
      <p className="text-6xl font-bold mx-10 my-3 inline">Your Listings</p>
      <button
        onClick={() => {
          setOptions(!showOptions);
        }}
        class="inline-block mx-5 mt-3 rounded bg-gradient-to-r from-rose-500 via-rose-800 to-rose-800 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span class="block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
          Edit
        </span>
      </button>
      <section className="grid grid-cols-3 row-span-5 col-span-10 my-16 gap-5 mx-12 overflow-y-auto">
        {listings.map((value, index) => {
          let location = value.sublocaly1.concat(
            " ",
            value.sublocaly2.concat(" ", value.neighbourhoodd)
          );
          return (
            <div className="relative" key={value.propertyid}>
              {showOptions ? (
                <div className="ml-5 mb-2">
                  <ReactTooltip />
                  {value.status === "Active" ? (
                    <button
                      data-tip="Mark your property as 'SOLD'"
                      onClick={() => {
                        submit(value.propertyid);
                      }}
                      class="inline-block rounded-full border border-green-600 bg-green-600 p-1 mr-2  text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
                    >
                      <span class="sr-only"> sold </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                    </button>
                  ) : null}
                  <button
                    data-tip="Delete this Listing"
                    onClick={() => {
                      submit2(value.propertyid);
                    }}
                    class="inline-block rounded-full border border-red-600 bg-red-600 p-1 mx-1 text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
                  >
                    <span class="sr-only"> delete </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div></div>
              )}

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
    <div className="text-4xl font-md mt-4 mr-4">{loading}</div>
  );
}

export default ViewListing;
