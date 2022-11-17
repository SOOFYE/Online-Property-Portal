import React, { useState, useRef } from "react";
import { supabase } from '../supabaseClient'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Homes = [
    "House",
    "Flat",
    "Upper Portion",
    "Lower Portion",
    "Farm house",
    "Room",
    "Penthouse",
  ];
  const Plots = [
    "Residential Plot",
    "Commercial Plot",
    "Agricultural Land",
    "Industrial Land",
    "Plot File",
    "Plot Farm",
  ];
  const Commercial = [
    "Office",
    "Shop",
    "Warehouse",
    "Factory",
    "Building",
    "Other",
  ];

let AllTags = []; //tags of all cities
let cc = 6;

function SearchForm({popup,setpopup,option,setFilRes}) {


  const navigate = useNavigate();


  const [tagsArea, settagsArea] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [count, setCount] = useState(6);
 
  const [properyTypeF, setPropertyTypeF] = useState(String); //the propertype you will send in query
  const [dropdown, setdropdown] = useState(""); //propertytype

  const[city,setCity] = useState("");
  const [minprice,setminPrice] = useState(0);
  const [maxprice,setmaxPrice] = useState("");
  const [minarea,setminArea] = useState(0);
  const [maxarea,setmaxarea] = useState("");
  const [bedrooms,setBedrooms] = useState("")


  const handleproperyTypeF = (e) => {
    setPropertyTypeF(e.target.value);
  };

  const handleCity = (e)=>{
    console.log(e)
    setCity(e.target.value)
  };

  const handleBedroom =(e)=>{
    setBedrooms(e.target.value);
  }

  const handlePropertyType = (e) => {
    let propertyType = e.target.value;
    console.log(propertyType);

    if (propertyType === "Homes") {
      setPropertyTypeF(Homes[0])
      let dd = Homes.map((value, index) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      });

      setdropdown(dd);
    }

    if (propertyType === "Plot") {
      setPropertyTypeF(Plots[0])
      let ddd = Plots.map((value, index) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      });

      setdropdown(ddd);
    }

    if (propertyType === "Commercial") {
      setPropertyTypeF(Commercial[0])
      let dddd = Commercial.map((value, index) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      });

      setdropdown(dddd);
    }
  };

  const RemoveTag = (index) => {
    console.log("All Tags", AllTags);
    console.log("Index", index);

    let filteredAllTags = AllTags.filter((element,i) => {
      return index!=i;
    });

    let cnt = count;
    ++cnt;
    setCount(cnt);

    

    console.log("filteredArray: ", filteredAllTags);

    let ta = filteredAllTags.map((value, index) => {
      return (
        <p
          key={index}
          className="truncate col-span-1 mx-2 mr-2 w-[70px] pl-2 pr-2 m-1 justify-start items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          {value}
          <svg
            onClick={() => RemoveTag(index)}
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 hover:text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </p>
      );
    });

    console.log(filteredAllTags);
    AllTags = filteredAllTags;

    settagsArea(ta);
  };
  const AddTags = () => {
    if(count===0) return;
    console.log("hello world");
    let ct = currentTag;
    if (ct == " " || ct == "" || ct === null || count === 0) return;

    let taggs = [...AllTags, ct]; //will be used to display
    AllTags = taggs;
    setCurrentTag("");
    let cnt = count;
    --cnt;
    setCount(cnt);
    
    let ta = taggs.map((value, index) => {
      return (
        <p
          key={index}
          className="truncate col-span-1 mx-2 mr-2 w-[70px] pl-2 pr-2 py-1 m-1 justify-start items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          {value}
          <svg
            onClick={() => RemoveTag(index)}
            xmlns="http://www.w3.org/2000/svg"
            class=" h-4 w-4 ml-1 hover:text-gray-300 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </p>
      );
    });

    settagsArea(ta);

    console.log("ALL TAGS: ", AllTags);
  };

  

  const handleSubmit = async (e)=>{

    console.log(AllTags.toString(),properyTypeF,city, minprice, maxprice, minarea, maxarea, bedrooms)

    e.preventDefault();

    let bedroomss = 0;
    let maxpr;
    let maxar;

    if(bedrooms==='10'){
        bedroomss = 11;
    }
    else if(bedrooms==='ANY'){
        bedroomss= -1;

    } 
    else{
        bedroomss = parseInt(bedrooms);
    }

    if(maxprice=== '' || maxprice===' '){
        maxpr = 99999999;
    }
    if(maxarea=== '' || maxarea===' '){
        maxar = 99999999;
    }

    //let tags = AllTags.toString();

    console.log("bedrooms", city);

    let op = option;

    if(option==='Buy')
      op = 'Sale'
    else
      op = 'Rent'  

    supabase
  .rpc('getfilteredresults', {
    bedroomss, 
    city, 
    maxarea: maxar, 
    maxprice: maxpr, 
    minarea: parseInt(minarea), 
    minprice: parseInt(minprice), 
    propertytype:properyTypeF, 
    tags: AllTags.toString(),
    purpose:op
  }).then((value)=>{

    console.log(value);

    setFilRes(value.data);

    setTimeout(()=>{
    navigate('/FilteredResults');
  },2000)

  AllTags=[];


}); //navigate

    
  }

  useEffect(()=>{

  },[popup])

  return (popup)? (
    <div>
    <div class="absolute bg-black z-10 bg-opacity-90 mx-auto mx-[4rem] w-screen h-max max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <button onClick={()=>setpopup(false)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg></button>
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl text-white font-bold sm:text-3xl">
          Lets Find Properties To {option}
        </h1>

        <p class="mt-4 text-white">Fill out the form to get filtered results</p>
      </div>

      <form onSubmit={handleSubmit} class="mx-auto  mt-8 mb-0 max-w-md space-y-4">
        <div>
          <div class="relative">
            <label for="city" className="font-bold text-white">
              City
            </label>
            <select
              id="city"
              name="city"
              class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={city}
              onChange={handleCity}
              required
            >
              <option value="" disabled selected>
                Select City
              </option>
              <option value="Islamabad">Islamabad</option>
              <option value="" disabled>
                Punjab Cities
              </option>
              <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
              <option value="Ahmadpur East">Ahmadpur East</option>
              <option value="Ali Khan Abad">Ali Khan Abad</option>
              <option value="Alipur">Alipur</option>
              <option value="Arifwala">Arifwala</option>
              <option value="Attock">Attock</option>
              <option value="Bhera">Bhera</option>
              <option value="Bhalwal">Bhalwal</option>
              <option value="Bahawalnagar">Bahawalnagar</option>
              <option value="Bahawalpur">Bahawalpur</option>
              <option value="Bhakkar">Bhakkar</option>
              <option value="Burewala">Burewala</option>
              <option value="Chillianwala">Chillianwala</option>
              <option value="Chakwal">Chakwal</option>
              <option value="Chichawatni">Chichawatni</option>
              <option value="Chiniot">Chiniot</option>
              <option value="Chishtian">Chishtian</option>
              <option value="Daska">Daska</option>
              <option value="Darya Khan">Darya Khan</option>
              <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
              <option value="Dhaular">Dhaular</option>
              <option value="Dina">Dina</option>
              <option value="Dinga">Dinga</option>
              <option value="Dipalpur">Dipalpur</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Ferozewala">Ferozewala</option>
              <option value="Fateh Jhang">Fateh Jang</option>
              <option value="Ghakhar Mandi">Ghakhar Mandi</option>
              <option value="Gojra">Gojra</option>
              <option value="Gujranwala">Gujranwala</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Gujar Khan">Gujar Khan</option>
              <option value="Hafizabad">Hafizabad</option>
              <option value="Haroonabad">Haroonabad</option>
              <option value="Hasilpur">Hasilpur</option>
              <option value="Haveli Lakha">Haveli Lakha</option>
              <option value="Jatoi">Jatoi</option>
              <option value="Jalalpur">Jalalpur</option>
              <option value="Jattan">Jattan</option>
              <option value="Jampur">Jampur</option>
              <option value="Jaranwala">Jaranwala</option>
              <option value="Jhang">Jhang</option>
              <option value="Jhelum">Jhelum</option>
              <option value="Kalabagh">Kalabagh</option>
              <option value="Karor Lal Esan">Karor Lal Esan</option>
              <option value="Kasur">Kasur</option>
              <option value="Kamalia">Kamalia</option>
              <option value="Kamoke">Kamoke</option>
              <option value="Khanewal">Khanewal</option>
              <option value="Khanpur">Khanpur</option>
              <option value="Kharian">Kharian</option>
              <option value="Khushab">Khushab</option>
              <option value="Kot Addu">Kot Addu</option>
              <option value="Jauharabad">Jauharabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Lalamusa">Lalamusa</option>
              <option value="Layyah">Layyah</option>
              <option value="Liaquat Pur">Liaquat Pur</option>
              <option value="Lodhran">Lodhran</option>
              <option value="Malakwal">Malakwal</option>
              <option value="Mamoori">Mamoori</option>
              <option value="Mailsi">Mailsi</option>
              <option value="Mandi Bahauddin">Mandi Bahauddin</option>
              <option value="Mian Channu">Mian Channu</option>
              <option value="Mianwali">Mianwali</option>
              <option value="Multan">Multan</option>
              <option value="Murree">Murree</option>
              <option value="Muridke">Muridke</option>
              <option value="Mianwali Bangla">Mianwali Bangla</option>
              <option value="Muzaffargarh">Muzaffargarh</option>
              <option value="Narowal">Narowal</option>
              <option value="Nankana Sahib">Nankana Sahib</option>
              <option value="Okara">Okara</option>
              <option value="Renala Khurd">Renala Khurd</option>
              <option value="Pakpattan">Pakpattan</option>
              <option value="Pattoki">Pattoki</option>
              <option value="Pir Mahal">Pir Mahal</option>
              <option value="Qaimpur">Qaimpur</option>
              <option value="Qila Didar Singh">Qila Didar Singh</option>
              <option value="Rabwah">Rabwah</option>
              <option value="Raiwind">Raiwind</option>
              <option value="Rajanpur">Rajanpur</option>
              <option value="Rahim Yar Khan">Rahim Yar Khan</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Sadiqabad">Sadiqabad</option>
              <option value="Safdarabad">Safdarabad</option>
              <option value="Sahiwal">Sahiwal</option>
              <option value="Sangla Hill">Sangla Hill</option>
              <option value="Sarai Alamgir">Sarai Alamgir</option>
              <option value="Sargodha">Sargodha</option>
              <option value="Shakargarh">Shakargarh</option>
              <option value="Sheikhupura">Sheikhupura</option>
              <option value="Sialkot">Sialkot</option>
              <option value="Sohawa">Sohawa</option>
              <option value="Soianwala">Soianwala</option>
              <option value="Siranwali">Siranwali</option>
              <option value="Talagang">Talagang</option>
              <option value="Taxila">Taxila</option>
              <option value="Toba Tek Singh">Toba Tek Singh</option>
              <option value="Vehari">Vehari</option>
              <option value="Wah Cantonment">Wah Cantonment</option>
              <option value="Wazirabad">Wazirabad</option>
              <option value="" disabled>
                Sindh Cities
              </option>
              <option value="Badin">Badin</option>
              <option value="Bhirkan">Bhirkan</option>
              <option value="Rajo Khanani">Rajo Khanani</option>
              <option value="Chak">Chak</option>
              <option value="Dadu">Dadu</option>
              <option value="Digri">Digri</option>
              <option value="Diplo">Diplo</option>
              <option value="Dokri">Dokri</option>
              <option value="Ghotki">Ghotki</option>
              <option value="Haala">Haala</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Islamkot">Islamkot</option>
              <option value="Jacobabad">Jacobabad</option>
              <option value="Jamshoro">Jamshoro</option>
              <option value="Jungshahi">Jungshahi</option>
              <option value="Kandhkot">Kandhkot</option>
              <option value="Kandiaro">Kandiaro</option>
              <option value="Karachi">Karachi</option>
              <option value="Kashmore">Kashmore</option>
              <option value="Keti Bandar">Keti Bandar</option>
              <option value="Khairpur">Khairpur</option>
              <option value="Kotri">Kotri</option>
              <option value="Larkana">Larkana</option>
              <option value="Matiari">Matiari</option>
              <option value="Mehar">Mehar</option>
              <option value="Mirpur Khas">Mirpur Khas</option>
              <option value="Mithani">Mithani</option>
              <option value="Mithi">Mithi</option>
              <option value="Mehrabpur">Mehrabpur</option>
              <option value="Moro">Moro</option>
              <option value="Nagarparkar">Nagarparkar</option>
              <option value="Naudero">Naudero</option>
              <option value="Naushahro Feroze">Naushahro Feroze</option>
              <option value="Naushara">Naushara</option>
              <option value="Nawabshah">Nawabshah</option>
              <option value="Nazimabad">Nazimabad</option>
              <option value="Qambar">Qambar</option>
              <option value="Qasimabad">Qasimabad</option>
              <option value="Ranipur">Ranipur</option>
              <option value="Ratodero">Ratodero</option>
              <option value="Rohri">Rohri</option>
              <option value="Sakrand">Sakrand</option>
              <option value="Sanghar">Sanghar</option>
              <option value="Shahbandar">Shahbandar</option>
              <option value="Shahdadkot">Shahdadkot</option>
              <option value="Shahdadpur">Shahdadpur</option>
              <option value="Shahpur Chakar">Shahpur Chakar</option>
              <option value="Shikarpaur">Shikarpaur</option>
              <option value="Sukkur">Sukkur</option>
              <option value="Tangwani">Tangwani</option>
              <option value="Tando Adam Khan">Tando Adam Khan</option>
              <option value="Tando Allahyar">Tando Allahyar</option>
              <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
              <option value="Thatta">Thatta</option>
              <option value="Umerkot">Umerkot</option>
              <option value="Warah">Warah</option>
              <option value="" disabled>
                Khyber Cities
              </option>
              <option value="Abbottabad">Abbottabad</option>
              <option value="Adezai">Adezai</option>
              <option value="Alpuri">Alpuri</option>
              <option value="Akora Khattak">Akora Khattak</option>
              <option value="Ayubia">Ayubia</option>
              <option value="Banda Daud Shah">Banda Daud Shah</option>
              <option value="Bannu">Bannu</option>
              <option value="Batkhela">Batkhela</option>
              <option value="Battagram">Battagram</option>
              <option value="Birote">Birote</option>
              <option value="Chakdara">Chakdara</option>
              <option value="Charsadda">Charsadda</option>
              <option value="Chitral">Chitral</option>
              <option value="Daggar">Daggar</option>
              <option value="Dargai">Dargai</option>
              <option value="Darya Khan">Darya Khan</option>
              <option value="Dera Ismail Khan">Dera Ismail Khan</option>
              <option value="Doaba">Doaba</option>
              <option value="Dir">Dir</option>
              <option value="Drosh">Drosh</option>
              <option value="Hangu">Hangu</option>
              <option value="Haripur">Haripur</option>
              <option value="Karak">Karak</option>
              <option value="Kohat">Kohat</option>
              <option value="Kulachi">Kulachi</option>
              <option value="Lakki Marwat">Lakki Marwat</option>
              <option value="Latamber">Latamber</option>
              <option value="Madyan">Madyan</option>
              <option value="Mansehra">Mansehra</option>
              <option value="Mardan">Mardan</option>
              <option value="Mastuj">Mastuj</option>
              <option value="Mingora">Mingora</option>
              <option value="Nowshera">Nowshera</option>
              <option value="Paharpur">Paharpur</option>
              <option value="Pabbi">Pabbi</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Saidu Sharif">Saidu Sharif</option>
              <option value="Shorkot">Shorkot</option>
              <option value="Shewa Adda">Shewa Adda</option>
              <option value="Swabi">Swabi</option>
              <option value="Swat">Swat</option>
              <option value="Tangi">Tangi</option>
              <option value="Tank">Tank</option>
              <option value="Thall">Thall</option>
              <option value="Timergara">Timergara</option>
              <option value="Tordher">Tordher</option>
              <option value="" disabled>
                Balochistan Cities
              </option>
              <option value="Awaran">Awaran</option>
              <option value="Barkhan">Barkhan</option>
              <option value="Chagai">Chagai</option>
              <option value="Dera Bugti">Dera Bugti</option>
              <option value="Gwadar">Gwadar</option>
              <option value="Harnai">Harnai</option>
              <option value="Jafarabad">Jafarabad</option>
              <option value="Jhal Magsi">Jhal Magsi</option>
              <option value="Kacchi">Kacchi</option>
              <option value="Kalat">Kalat</option>
              <option value="Kech">Kech</option>
              <option value="Kharan">Kharan</option>
              <option value="Khuzdar">Khuzdar</option>
              <option value="Killa Abdullah">Killa Abdullah</option>
              <option value="Killa Saifullah">Killa Saifullah</option>
              <option value="Kohlu">Kohlu</option>
              <option value="Lasbela">Lasbela</option>
              <option value="Lehri">Lehri</option>
              <option value="Loralai">Loralai</option>
              <option value="Mastung">Mastung</option>
              <option value="Musakhel">Musakhel</option>
              <option value="Nasirabad">Nasirabad</option>
              <option value="Nushki">Nushki</option>
              <option value="Panjgur">Panjgur</option>
              <option value="Pishin Valley">Pishin Valley</option>
              <option value="Quetta">Quetta</option>
              <option value="Sherani">Sherani</option>
              <option value="Sibi">Sibi</option>
              <option value="Sohbatpur">Sohbatpur</option>
              <option value="Washuk">Washuk</option>
              <option value="Zhob">Zhob</option>
              <option value="Ziarat">Ziarat</option>
            </select>
          </div>
        </div>

        <div>
          <div class="relative ">
            <label className="text-white font-bold  ">
              Location/Area{" "}
              <p className="inline font-light text-xs">limit-{count}</p>{" "}
            </label>
            <input
              type="text"
              id="location"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Location/Area"
              class="mt-2 w-full rounded-md border-gray-200 py-2.5 pr-10 shadow-sm sm:text-sm"
            />

            <span class="mt-7 absolute inset-y-0 right-0 grid w-10 place-content-center">
              <button
                type="button"
                class={(count>0)?"rounded-full bg-rose-600 p-0.5 text-white hover:bg-rose-700":("hidden")}
                onClick={() => AddTags()}
              >
                <span type="button" class="sr-only">
                  Submit
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </button>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 grid-row-flow justify-items-start">
          {/* <span
        class="col-span-2 mt-3 w-fit flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100">
        UI/UX
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-3 hover:text-gray-300" viewBox="0 0 20 20"
          fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd" />
        </svg>
      </span> */}

          {tagsArea}
        </div>

        <div>
            <h3 class="mb-2 text-lg font-medium text-white dark:text-white">Your Property Type</h3>
    <ul class="grid gap-6 w-full md:grid-cols-3">
        <li>
            <input onChange={handlePropertyType} type="radio" id="Homes" name="hosting" value="Homes" class="hidden peer" required/>
            <label for="Homes" class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                <div class="block">
                    <div class="w-full text-lg font-semibold">Homes</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>

            </label>
        </li>
        <li>
            <input onChange={handlePropertyType} type="radio" id="Plots" name="hosting" value="Plot" class="hidden peer"/>
            <label for="Plots" class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="inline">
                    <div class="w-full text-lg font-semibold">Plots</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>

            </label>
        </li>
        <li>
            <input onChange={handlePropertyType} type="radio" id="Commercial" name="hosting" value="Commercial" class="hidden peer" required/>
            <label for="Commercial" class="inline-flex justify-between items-center p-5 w-[200px] text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                <div class="block">
                    <div class="w-full text-lg font-semibold">Commercial</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>

            </label>
        </li>
    </ul>
</div>

<div className="">
            <select
              id="PropertyTYpe"
              className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={properyTypeF}
              onChange={handleproperyTypeF}
              required
            >
              {dropdown}
            </select>
</div>


<div className="my-10">
<label className="text-white font-bold ">Price Range</label>
<div className="grid grid-cols-3 mt-2">
<div class="relative mr-3">
    <input required value={minprice} onChange={(e)=>setminPrice(e.target.value)} type="number" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined" class="absolute bg-transparent my-2 font-light text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">minimum</label>
</div>
<div class="relative mr-3">
    <input value={maxprice} onChange={(e)=>setmaxPrice(e.target.value)} type="number" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined"  class="absolute bg-transparent my-2 font-light  text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">maximum</label>
</div>
<div class="relative mr-3 "><p className="text-white font-light text-xs mt-4">*leave blank for any</p></div>
</div>
</div>

<div className="my-10">
<label className="text-white font-bold ">
              Area (Square Feet)
            </label>
<div className="grid grid-cols-3 mt-2">
<div class="relative mr-3">
    <input required value={minarea} onChange={(e)=>setminArea(e.target.value)} type="number" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined" class="absolute bg-transparent my-2 font-light text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">minimum</label>
</div>
<div class="relative mr-3">
    <input value={maxarea} onChange={(e)=>setmaxarea(e.target.value)} type="number" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined"  class="absolute bg-transparent my-2 font-light  text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">maximum</label>
</div>
<div class="relative mr-3 "><p className="text-white font-light text-xs mt-4">*leave blank for any</p></div>
</div>
</div>

<div>
<label className="text-white font-bold ">Bedroom's</label>
<select
              id="city"
              anme="city"
              class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={bedrooms}
              onChange={handleBedroom}
              required
            >
              <option value="" disabled selected>
                Select Bedroom's
              </option>
              <option value="ANY">Any</option>
              <option value="1">Studio</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10+</option>
              </select>
</div>
       

        
        

       <button
  class="group relative inline-flex items-center text-center w-full overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
  
>
  <span
    class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4"
  >
    <svg
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </span>

  <span class="text-lg font-medium transition-all group-hover:mr-4">
    Search
  </span>
</button>



      </form>
    </div>
</div>
  ):(<div></div>);
}

export default SearchForm;
