import React, { useState } from "react";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";

function HomePage({ setFilRes }) {
  const [openPopup, setpopup] = useState(false);
  const [option, setoption] = useState("");

  return (
    <div>
      <section class="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
        <SearchForm
          popup={openPopup}
          setpopup={setpopup}
          option={option}
          setFilRes={setFilRes}
        />
        <div class="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/50 sm:to-white/0"></div>

        <div class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[35rem] lg:items-center lg:px-8">
          <div class="max-w-xl text-center sm:text-left">
            <h1 class="text-3xl font-extrabold sm:text-5xl">
              Let us find your
              <strong class="block font-extrabold text-rose-700">
                Forever Home.
              </strong>
            </h1>

            <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
              Search the place you would like to see the properties at or just
              Browse.
            </p>

            <div class="mt-8 flex flex-wrap gap-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setoption("Buy");
                  setpopup(true);
                }}
                class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Buy
              </button>

              <button
                type="button"
                onClick={() => {
                  setoption("Rent");
                  setpopup(true);
                }}
                class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Rent
              </button>

              <Link to="/Browse">
                {" "}
                <button
                  type="button"
                  class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  Browse
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div>
        <p className="text-3xl font-extrabold sm:text-4xl mx-2 -mb-1">
          Explore more
        </p>
        <div className="grid grid-cols-10 gap-10 overflow-hidden  ">
          <Link to="/AreaUnitCoverter">
            <div className="mt-4 mx-5 group rounded-2xl bg-green-900 w-[100px] h-[100px] grid col-span-1 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                class="w-14 h-14 stroke-green-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                />
              </svg>
              <div className="invisible group-hover:visible rounded-2xl absolute bg-gray-800 opacity-90  grid place-items-center w-[100px] h-[100px] font-bold  text-white text-center ">
                Area Unit Converter{" "}
              </div>
            </div>
          </Link>

          <Link to="/MortageCalculator">
            <div className="inline mt-4 mx-3 group rounded-2xl bg-teal-900 w-[100px] h-[100px] grid col-span-1  place-items-center  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-14 h-14 stroke-teal-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
              <div className="invisible group-hover:visible rounded-2xl absolute bg-gray-800 opacity-90  grid place-items-center w-[100px] h-[100px] font-bold  text-white text-center ">
                Mortage Calculator
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
