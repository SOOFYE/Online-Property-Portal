import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { numberWithCommas } from "../Functions/numberWithCommas";

function BrowseListings() {
  const ofst = useRef(0);
  const [hsmre, sethasmore] = useState(true);
  const [listings, setListing] = useState([]);

  const getData = async () => {
    let { data, error } = await supabase.rpc("browse", {
      ofst: ofst.current,
    });

    if (data.length === 0 || error || data == null || data == undefined) {
      sethasmore(false);
      console.log(error);
      return;
    } else {
      console.log(data);
      if (listings.length === 0) {
        setListing(data);
        ofst.current = ofst.current + 4;
      } else {
        setListing(listings.concat(data));

        ofst.current = ofst.current + 4;
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return listings !== undefined ? (
    <InfiniteScroll
      dataLength={listings.length}
      next={getData}
      hasMore={hsmre}
      loader={
        <p className="text-xl font-bold">
          <b>Loading...</b>
        </p>
      }
      className=" grid grid-cols-3 row-span-5 col-span-10 my-16 gap-5 mx-12 overflow-y-auto"
      endMessage={
        <p className="block text-xl font-bold">
          <b className="block">Yay! You have seen it all</b>
        </p>
      }
    >
      {listings.map((value, index) => {
        let location = value.sublocaly1.concat(
          " ",
          value.sublocaly2.concat(" ", value.neighbourhoodd)
        );
        return (
          <Link to={"/SingleListing/" + value.propertyid}>
            <div className="group block overflow-hidden mb-4" key={index}>
              <div className="overflow-hidden rounded-3xl">
                {/* <img
                        alt="property"
                        src={value.imagepath}
                        className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-90 sm:h-[350px]"
                        /> */}
                <LazyLoadImage
                  alt="property"
                  src={value.imagepath} // use normal <img> attributes as props
                  className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-95 sm:h-[350px]"
                />

                <div className="relative pt-4">
                  <h3 className="truncate hover:whitespace-normal font-medium text-sm mb-2">
                    {value.city}
                  </h3>
                  <h3 className="truncate hover:whitespace-normal  text-sm group-hover:underline group-hover:underline-offset-4 decoration-solid decoration-indigo-600 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="inline w-5 h-5 mr-1"
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
                  <h3 className=" truncate hover:whitespace-normal  font-medium text-sm mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 inline mr-1  "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                      />
                    </svg>

                    {value.proptype}
                  </h3>
                  <h3 className="truncate hover:whitespace-normal  font-medium text-sm">
                    <i class="ml-1 fa-solid fa-bed"></i> {value.bedrooms}
                  </h3>

                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>

                    <span className="font-bold tracking-wider mx-2">
                      PKR {numberWithCommas(value.price)}{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </InfiniteScroll>
  ) : (
    <div className="text-3xl">Loading...</div>
  );
}

export default BrowseListings;
