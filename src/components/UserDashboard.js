import React, {useEffect,useState} from 'react'
import { supabase } from '../supabaseClient'
import ReactTooltip from 'react-tooltip';
import {numberWithCommas} from '../Functions/numberWithCommas';

function UserDashboard() {

  const ownerid = '2e0ef298-f57d-4223-b1c7-14200f2414e0';

    const [pendingCount,setpendingCount] = useState();
    const [ActiveCount,setActiveCount] = useState();
    const [recentListings,setListings] = useState([]);
    const [Profit,setProfit] = useState(0);




    const getpendingstatuscount = async()=>{
      const {data,error} = await supabase.rpc('GetStatusCount', {
        ownerid, 
        statusvalue:"Pending"
      })
      setpendingCount(data)
    }

    const getactivestatuscount = async()=>{
      const {data,error} = await supabase.rpc('GetStatusCount', {
        ownerid, 
        statusvalue:"Active"
      })
      setActiveCount(data)
    }

    const getrecentlisting = async()=>{
      const {data,error} = await supabase.rpc('getrecentlistings', {
        ownerid
      })
      console.log(data);
      setListings(data)

    }

    const getsoldprice = async()=>{
      let { data, error } = await supabase.rpc('getsoldpropertyprice', {
         ownerid
      })

      console.log(data,error);
      if(data!==null){
        setProfit(numberWithCommas(data));
      }
      else{
        setProfit(0);
      }
    }

  useEffect(()=>{

      getpendingstatuscount();
      getactivestatuscount();
      getrecentlisting();
      getsoldprice();

  //   supabase.rpc('GetStatusCount', {
  //   ownerid, 
  //   statusvalue:"Pending"
  // }).then((value)=>setpendingCount(value.data));

  // supabase.rpc('GetStatusCount', {
  //   ownerid, 
  //   statusvalue:"Active"
  // }).then((value)=>setActiveCount(value.data));

  // supabase.rpc('getrecentlistings', {
  //   ownerid
  // }).then(value=>{console.log(value.data);setListings(value.data)});

  },[])


  return (
    
    <section className="bg-white row-span-3 col-span-7">
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-indigo-600 sm:text-4xl">
          Your Property Stats
        </h2>
  
        <p className="mt-4 text-gray-500 sm:text-xl">
          This stats are for all your Property listings that are currently posted.
        </p>
      </div>
  
      <div className="mt-8 sm:mt-12">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium text-gray-500">
              Total Profit
            </dt>
  
            <ReactTooltip />
            <dd data-tip="Profit from all your 'SOLD' Properties" className="text-4xl font-extrabold text-gray-800 md:text-5xl">
              ${Profit}
            </dd>
          </div>
  
          <div
            className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium text-gray-500">
             Active Listings
            </dt>
  
            <dd className="text-4xl font-extrabold text-gray-800 md:text-5xl">{ActiveCount}</dd>
          </div>
  
          <div
            className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium text-gray-500">
              Pending Listings
            </dt>
  
            <dd className="text-4xl font-extrabold text-gray-800 md:text-5xl">{pendingCount}</dd>
          </div>
        </dl>
      </div>
    </div>


    <section className="bg-white row-span-4 col-span-7">
    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-5 md:py-13 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-indigo-600 sm:text-4xl mb-4">
          Your Recent Listings
        </h2>

        <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
  <table className="min-w-full divide-y divide-gray-200 text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th
          className="whitespace-nowrap px-5 py-2 text-left font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            Property ID
          </div>
        </th>
        <th
          className="whitespace-nowrap px-5 py-2 text-left font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            Property Title
          </div>
        </th>
        <th
          className="whitespace-nowrap px-5 py-2 text-left font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            Property Price
          </div>
        </th>
        <th
          className="whitespace-nowrap px-5 py-2 text-left font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            Property Views
          </div>
        </th>
        <th
          className="whitespace-nowrap px-13 py-2 text-centre font-medium text-gray-900"
        >
          Status
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">

    {recentListings.map((value,index)=>{
      return(
        <tr key={index}>
        <td className="whitespace-nowrap w-10 px-2 py-2 font-medium text-gray-900">{value.propertyid}</td>
        <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{value.propertytitle}</td>
        <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{value.price}</td>
        <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{value.views}</td>
        <td className="whitespace-nowrap px-4 py-2">
          <strong
            className={"rounded px-3 py-1.5 text-xs font-medium " + (value.status==='Pending'?'bg-amber-100 text-amber-700':value.status==='Active'?'bg-green-100 text-green-700':'bg-red-100 text-red-700')}
          >
            {value.status}
          </strong>
        </td>
        </tr>
      )
    })}
      
    </tbody>
  </table>
</div>


    </div>
    </div>
  </section>


  </section>
  )
}

export default UserDashboard
