import React, { useState } from 'react'

import convert from 'convert';

function UnitConverter() {

    const [option1,setOption1] = useState("sq ft");
    const [option1value,setoption1value] = useState(0);
    const [option2,setOption2] = useState("m2");
    const [option2value,setoption2value] = useState(0);

    const onChange1value = (e)=>{
        
        setoption1value(e.target.value)
        let option1VALUE = e.target.value
        //console.log(option1VALUE);
        setoption2value(convert(parseInt(option1VALUE),option1).to(option2));
    }

    const onChange2value = (e)=>{
       
        setoption2value(e.target.value)
        let option2VALUE = e.target.value
        //console.log(option1VALUE);
        setoption1value(convert(parseInt(option2VALUE),option2).to(option1));
       
    }

    const onChangeoption1 = (unit)=>{

        setoption1value(convert(parseInt(option2value),option2).to(unit));
    }

    const onChangeoption2 = (unit)=>{

        setoption2value(convert(parseInt(option1value),option1).to(unit));
    }
   
   


  return (
    <div>


    <div class="grid place-items-center w-screen mt-[100px] text-4xl font-black">
            Area Unit Converter
    </div>

    <div class="grid place-items-center w-screen mt-[100px] text-4xl font-black">

    <div class="flex">
        
        <select
            value={option1}
            onChange={(e)=>{setOption1(e.target.value);onChangeoption1(e.target.value)}}
            
            id="Category"
            placeholder="Category"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            >
            <option selected value="sq ft">Square Feet</option>
            <option value="m2">Square Meters</option>
            <option value="cm2">Square Centimeter</option>
            <option value="km2">Square Kilometer</option>
            <option value="mi2">Square Miles</option>
            <option value="ac">Acres</option>
            <option value="ha">Hectare</option>
        </select>
        <div class="relative w-full">
            <input value={option1value} onChange={onChange1value} type="number" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="" required/>
        </div>
    </div>

    <div>
        =
    </div>

    <div class="flex mt-2">
        <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
        <select
            value={option2}
            onChange={(e)=>{setOption2(e.target.value);onChangeoption2(e.target.value)}}
            id="Category"
            placeholder="Category"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            >
            <option selected value="sq ft">Square Feet</option>
            <option value="m2">Square Meters</option>
            <option value="cm2">Square Centimeter</option>
            <option value="km2">Square Kilometer</option>
            <option value="mi2">Square Miles</option>
            <option value="ac">Acres</option>
            <option value="ha">Hectare</option>
        </select>
        <div class="relative w-full">
            <input value={option2value} onChange={onChange2value} type="number" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="" required/>
        </div>
    </div>





    </div>
    
    </div>
  )
}

export default UnitConverter