import React, {useState} from 'react'
import SearchForm from './SearchForm'

function HomePage() {

  const [openPopup,setpopup]= useState(false);
  const [option,setoption] = useState("");
  

  return (

    <section
  class="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
>
<SearchForm popup={openPopup} setpopup={setpopup} option={option}/>
  <div
    class="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/50 sm:to-white/0"
  ></div>

  <div
    class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[35rem] lg:items-center lg:px-8"
  >
    <div class="max-w-xl text-center sm:text-left">
      <h1 class="text-3xl font-extrabold sm:text-5xl">
        Let us find your

        <strong class="block font-extrabold text-rose-700">
          Forever Home.
        </strong>
      </h1>

      <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
        Search the place you would like to see the properties at or just Browse.
      </p>

      <div class="mt-8 flex flex-wrap gap-4 text-center">
        <button type="button" onClick={()=>{setoption("Buy");setpopup(true)}}
          
          class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
        >
          Buy
        </button>

        <button type="button" onClick={()=>{setoption("Rent");setpopup(true)}}
          
          class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        >
          Rent
        </button>
      </div>
    </div>
  </div>
</section>


//     <section className="bg-fixed bg-center" style={{'backgroundImage': `url("https://ffixephepheoizedsluo.supabase.co/storage/v1/object/public/other-pics/sofia-sanchez-UcoDZZ7DCXY-unsplash.jpg")`}} >
//     <SearchForm popup={openPopup} setpopup={setpopup} option={option}/>
//   <div className="p-8 md:p-12 lg:px-16 lg:py-24">
//     <div className="mx-auto max-w-lg text-center">
//       <h2 className="text-2xl mb-5 font-bold text-white md:text-3xl">
//         Search properties in Pakistan
//       </h2>
//     </div>

//     <div className="mx-auto mt-8 max-w-xl">
//      <div className="grid grid-flow-row-dense grid-col-12 gap-4">
//      <div className="flex justify-center">
//         <button onClick={()=>{setoption("Buy");setpopup(true)}}
//           class="col-span-3 mr-[7rem] group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none  active:text-white"
          
//         >
//           <span class="absolute inset-0 border border-current "></span>
//           <span
//             class="block border border-current bg-gray-300 active:bg-indigo-500 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
//           >
//               Buy
//           </span>
//         </button>
//         <button onClick={()=>{setoption("Rent");setpopup(true)}}
//           class="col-span-3 group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none active:text-white"
          
//         >
//           <span class="absolute inset-0 border border-current "></span>
//           <span
//             className="block border border-current bg-gray-300 active:bg-indigo-500 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
//           >
//               Rent
//           </span>
//         </button>
//      </div>
//      </div>
//     </div>
//     <div className="my-5 flex justify-start">
//       <p className="text-xl text-white font-bold">Explore more on FindyourHome.com</p>
//     </div>
//     <div>

//     </div>
//   </div>

  
// </section>
  )
}

export default HomePage