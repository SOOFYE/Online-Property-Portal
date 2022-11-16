import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import {numberWithCommas} from '../Functions/numberWithCommas';



function MortageCalculator() {

   
    const [houseCost,sethousecost] = useState(0);
    const [M,setM] = useState(0);
    const [downPayment,setdownpayment] = useState(0);
    const [per,setper] = useState(0);
    const [loanYear,setloanYear] = useState(0);
    const [P,setP] = useState(0);
    const [I,setI] = useState(0);
    const [N,setN] = useState(0);


    const loanAmount = useRef(0);
    const numberofMonths = useRef(0);
    const interestRate = useRef(0);

const handleHouseCost  = (e)=>{
    sethousecost(e.target.value);
    let pe = ((downPayment)*100)/(e.target.value)
    setper(pe);

    setP(e.target.value-downPayment)

    




}

const handleDP = (e)=>{
    setdownpayment(e.target.value);
    let pe = ((e.target.value)*100)/(houseCost)
    setper(pe);

    setP(houseCost-e.target.value)





    
}

const handlePer = (e)=>{
    let downp = houseCost * (e.target.value/100)
    setdownpayment(downp);

  

}

const handleloan =(e)=>{
    setloanYear(e.target.value);
    setN(e.target.value*12);



    
}

const handleintrest = (e)=>{

    setI(e.target.value)

 

}

const calculate = ()=>{
    loanAmount.current = P;
    numberofMonths.current = N;
    interestRate.current = I/1200;

    if(numberofMonths.current===0 ||numberofMonths.current===null || interestRate.current===0 || interestRate.current===null ||loanAmount.current===0 || loanAmount.current===null){
        setM("NaN")
        return;
    }

    let result =
    eval(loanAmount.current * interestRate.current) /
    (1 - Math.pow(1 + interestRate.current, numberofMonths.current * -1)).toFixed(3);
  
        if(result>0)
            setM(Math.round(result*100)/100);
        else{
            setM("NaN")   
        }    
}




//     For your mortgage calc, you’ll use the following equation:

// M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]. 

// Here’s a breakdown of each of the variables:

// M = Total monthly payment
// P = The total amount of your loan
// I = Your interest rate, as a monthly percentage
// N = The total amount of months in your timeline for paying off your mortgage

  return (
    <div>

        <div class="grid place-items-center w-screen mt-[100px] text-4xl font-black">
                Mortgage Calculator
        </div>

        <div class="grid place-items-center w-screen mt-[80px]  text-4xl font-black">

            <div class="flex mb-5">

                <label
                for="UserEmail"
                class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                
                <input
                    value={houseCost}
                    onChange={handleHouseCost}
                    type="number"
                    id="UserEmail"
                    placeholder="Email"
                    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                    class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                    Home price $
                </span>
                </label>

            </div>


            <div class="flex mb-5">

                <label
                for="UserEmail"
                class="relative block overflow-hidden mr-5 rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                    value={downPayment}
                    onChange={handleDP}
                    type="number"
                    id="UserEmail"
                    placeholder="Email"
                    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                    class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                    Down payment $
                </span>
                </label>

                <label
                for="UserEmail"
                class="relative block overflow-hidden  rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                    value={per}
                    onChange={(e)=>{handlePer(e);setper(e.target.value)}}
                    type="number"
                    id="UserEmail"
                    placeholder="Email"
                    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                    class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                    %
                </span>
                </label>

            </div>



            <div class="flex mb-5">

                <label
                for="UserEmail"
                class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                    value={loanYear}
                    onChange={handleloan}

                    type="number"
                    id="UserEmail"
                    placeholder="Email"
                    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                    class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >Length of loans (years)
                </span>
                </label>

            </div>

            <div class="flex mb-5">

                <label
                for="UserEmail"
                class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                    value={I}
                    onChange={handleintrest}
                    type="number"
                    id="UserEmail"
                    placeholder="Email"
                    class="inline peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                    class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >Interest rate %
                </span>
                </label>

            </div>

            <div>
                <button type="button"  onClick={()=>calculate()}>Calculate</button>
            </div>


            <hr class="my-4 mx-auto w-[500px] h-1 bg-gray-100 rounded border-0 md:my-5 dark:bg-gray-700"/>


            <div class="flex mb-5">
                ${numberWithCommas(M)}   
            </div>
            <div className="text-sm">Your estimated monthly payment</div>

        </div>

    </div>
  )
}

export default MortageCalculator