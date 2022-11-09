import React, {useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import { supabase } from '../supabaseClient'

function MarkedSpam({setoption3}) {
    const [tablerows,setTableRows] = useState([]);

    const getspamProp = async()=>{

        let { data, error } = await supabase.rpc('getspamproperties')

        console.log(data,error);

        setTableRows(data);

    }

    const updateSpamStatus = async (pid) =>{

        let { data, error } = await supabase.rpc('updatemarkedspamstatus', {
            propertyid:pid
        })

        console.log(data);

        getspamProp();
    }

    useEffect(()=>{

        setoption3(true);

        getspamProp();

    },[])


  return(tablerows!==undefined && tablerows.length!==0)?(
    <div class="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Approval
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              PropertyID
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Title
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Address
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Price
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">

        {tablerows.map((value,index)=>{
            return(
                <tr key={index}>
            <td class="bg-white px-4 py-2">
              <label class="sr-only" for="Row1">
                Row {index}
              </label>

              <button type="button" onClick={()=>updateSpamStatus(value.propertyid)}
                class="group inline-block rounded-full border border-green-600 p-1 text-green-600 hover:bg-green-600 hover:text-white focus:outline-none hover:stroke-black focus:ring active:bg-indigo-500"
                
              >
                <span class="sr-only"> Approve </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="green"
                  class="w-3 h-3 group-hover:stroke-black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>
              
            </td>
            <td class="group hover:text-indigo-800 whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <Link to={"/SingleListing/"+value.propertyid}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="group-hover:stroke-blue inline w-3 h-3 mx-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
             {value.propertyid}</Link>
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {value.propertytitle}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {value.address}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{value.price}</td>
          </tr>

            )
        })}
        </tbody>
      </table>
    </div>
  ):(tablerows.length===0 && tablerows!==undefined)?(<div>None marked as spam </div>):(<div>ErrorRetriving Data</div>);
}

export default MarkedSpam