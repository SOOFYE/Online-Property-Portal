import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { ToWords } from "to-words";

import { supabase } from '../supabaseClient'

import { Navigate, useNavigate } from "react-router-dom";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

const searchOptions = {
  componentRestrictions: { country: ["pk"] },
};

function AddListing() {

  const navigate = useNavigate();

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

  const [dropdown, setdropdown] = useState(""); //propertytype

  const [purpose, setPurpose] = useState(String);
  const [properyTypeF, setPropertyTypeF] = useState(String);
  const [City, setCity] = useState(String);
  const [address, setaddress] = useState(""); //actual address we willl use
  const [landMark,setlandMark] = useState("N/A");
  const [neighbourhood,setneighbourhood] = useState(" ");
  const [sublocality_level_1,setsublocality_level_1] = useState(" ");
  const [sublocality_level_2,setsublocality_level_2] = useState(" ");
  const [formatedAddress, setFormatAddress] = useState(" "); //result stored if needed
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [areaUnits, setareaUnits] = useState("");
  const [units, setUnits] = useState("");
  const [Ocupancy, setOcupancy] = useState("Vacant");
  const [price, setPrice] = useState("");
  const [priceWords, setPriceWords] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setImage] = useState(undefined);
  const [imagePath,setimagePath] = useState(String);



    const Getimageurl = (imagepath) =>{
      return new Promise(function(resolve,reject){
        const { data } = supabase.storage.from('properties').getPublicUrl(imagepath)
        if(data!=null)
        resolve(data.publicUrl);
        else
        reject('Image Path invalid!');
      })
    }

    const handleSubmit = async (e)=>{

      e.preventDefault();

      //adduseruuid********************************

      supabase
     .storage
     .from('properties')
     .upload(`UIDd${selectedImage.name}`+Math.random(), selectedImage)
     .then(value=>{
      console.log("Sent!: ",value.data.path);
      setimagePath(value.data.path);

      Getimageurl(value.data.path).then((value)=>{
        console.log(value);
        
        supabase.from('properties')
        .insert({
          Owner_uuid: '2e0ef298-f57d-4223-b1c7-14200f2414e0',
          Purpose: purpose,
          PropertyType: properyTypeF,
          City: City,
          Address: address,
          lat: lat,
          lng: lng,
          AreaUnits: areaUnits,
          OcupancyStatus: Ocupancy,
          Price: price,
          PropertyTitle: propertyTitle,
          Description: description,
          ImagePath: value,
          Status: 'Pending',
          neighbourhood: neighbourhood,
          sublocal1: sublocality_level_1,
          sublocal2: sublocality_level_2,
          landmark: landMark
  
        })
        .then(value=>{
          console.log("data saved :",value);
          navigate("/MemberPortal/ViewListing")

          })
        .catch(error=>console.log(error));
      })

      //if value.status error condition!

     })
     .catch(error=>console.log(error));


    }


  const handlePurpose = (e) => {
    setPurpose(e.target.value);
  };
  const handleproperyTypeF = (e) => {
    setPropertyTypeF(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handlePrice = (e) => {
    if (e.target.value > 999999999) {
      setPriceWords("Price is too big!");
    }
    setPrice(e.target.value);
    setPriceWords(toWords.convert(e.target.value, { currency: true }));
  };
  const handleAreaUnits = (e) => {
    setareaUnits(e.target.value);
  };
  const handleUnits = (e) => {
    setUnits(e.target.value);
  };
  const handlesetOcupancy = (e) => {
    setOcupancy(e.target.value);
  };
  const handlesetPropertyTitle = (e) => {
    setPropertyTitle(e.target.value);
  };
  const handlesetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChange = (address) => {
    setaddress(address);
    //for udating your writing in input box.
  };

  const handleSelect = (address) => {
    setaddress(address);
    console.log(address);
    geocodeByAddress(address)
      .then((results) => {
        results[0].address_components.map((value)=>{
          console.log(value)
          value.types.map((typeval)=>{
            if(typeval==='neighbourhood'){
              return setneighbourhood(value.long_name);
            }
            if(typeval==='sublocality_level_1'){
              return setsublocality_level_1(value.long_name);
            }
            if(typeval==='setsublocality_level_2'){
              return sublocality_level_2(value.long_name);
            }
            if(typeval==='locality'){
              return setCity(value.long_name);
            }
            if(typeval==='landmark'){
              return setlandMark(value.long_name);
            }
            return null;
          })
          return null;
        })

        

        getLatLng(results[0]).then((value) => {
          setLng(value.lng);
          setLat(value.lat);
        });
        setFormatAddress(results[0]);
        //console.log(lat,lng);
      })
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

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

  return (
    <div className="col-span-12 px-4 py-14 sm:px-6 lg:px-8">
      <div className="">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Lets Add A New Listing!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Please fill out all the{" "}
          <b className="underline decoration-red-700 decoration-double">
            necessary
          </b>{" "}
          details
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6  mb-0 space-y-4 rounded-lg p-8 shadow-2xl"
        >
          <p className="text-xl font-semibold font-medium underline dark:text-white decoration-gray-500 decoration-wavy">
            Purpose, Property Type And Location
          </p>

          <div>
            <label
              for="purpose"
              className="text-sm font-medium underline decoration-red-700 decoration-dotted underline-offset-4 decoration-2"
            >
              Purpose
            </label>

            <div className="mt-2 mb-2 flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                id="bordered-radio-1"
                type="radio"
                value="Sale"
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handlePurpose}
                required
              />

              <label
                for="bordered-radio-1"
                className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                For Sale
              </label>
            </div>
            <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                id="bordered-radio-2"
                type="radio"
                value="Rent"
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handlePurpose}
                required
              />
              <label
                for="bordered-radio-2"
                className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                For Rent
              </label>
            </div>
          </div>

          <div>
            <label
              for="PropertyType"
              className="text-sm font-medium underline decoration-red-700 decoration-dotted underline-offset-4 decoration-2"
            >
              Property Type
            </label>

            <div className="mt-2 mb-2 flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                onChange={handlePropertyType}
                id="bordered-radio-11"
                type="radio"
                value="Homes"
                name="bordered-radio-2"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <label
                for="bordered-radio-11"
                className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Homes
              </label>
            </div>
            <div className="mb-2 flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                onChange={handlePropertyType}
                id="bordered-radio-22"
                type="radio"
                value="Plot"
                name="bordered-radio-2"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <label
                for="bordered-radio-22"
                className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Plot
              </label>
            </div>

            <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                onChange={handlePropertyType}
                id="bordered-radio-33"
                type="radio"
                value="Commercial"
                name="bordered-radio-2"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <label
                for="bordered-radio-33"
                className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Commercial
              </label>
            </div>
          </div>

          <div>
            <select
              id="PropertyTYpe"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={properyTypeF}
              onChange={handleproperyTypeF}
              required
            >
              {dropdown}
            </select>
          </div>

          {/* <div>
            <label
              for="city"
              className="text-sm font-medium underline decoration-red-700 decoration-double"
            >
              City
            </label>
            <select
              id="city"
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={City}
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
          </div> */}

          <div>
            <label
              for="email"
              className="text-sm font-medium underline decoration-red-700 decoration-dotted underline-offset-4 decoration-2"
            >
              Location
            </label>
            <PlacesAutocomplete
              searchOptions={searchOptions}
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Enter Property Location ...",
                      className:
                        "location-search-input mt-2 w-full rounded-lg border-gray-700 p-4 pr-12 text-sm shadow-sm",
                    })}
                  />
                  <div className="autocomplete-dropdown-container bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          <p className="text-xl font-semibold font-medium underline dark:text-white decoration-gray-500 decoration-wavy">
            Property Specs And Price
          </p>

          <div>
            <label
              for="AreaUnits"
              className="pr-10 text-sm font-medium underline decoration-red-700 decoration-double"
            >
              Area Units
            </label>
            <input
              type="number"
              name="AreaUnits"
              placeholder="Area Units"
              required
              className="rounded-lg border-gray-700 p-4 text-sm shadow-sm"
              value={areaUnits}
              onChange={handleAreaUnits}
            />

            <select
              id="AreaUnits"
              className="mx-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={units}
              onChange={handleUnits}
              required
            >
              <option value="Square Feet">Square Feet</option>
              <option value="Square Meters">Square Meters</option>
              <option value="Square Yards">Square Yards</option>
              <option value="Marla">Marla</option>
              <option value="Kanal">Kanal</option>
            </select>
          </div>

          <div>
            <label
              for="AreaUnits"
              className="pr-10 text-sm font-medium underline decoration-red-700 decoration-double"
            >
              Occupancy Status
            </label>

            <select
              id="OcupancyStatus"
              className="pr-12  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={Ocupancy}
              onChange={handlesetOcupancy}
              required
            >
              <option value="Vacant">Vacant</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>

          <div>
            <label
              for="price"
              className="block pr-10 text-md font-medium underline decoration-red-700 decoration-double"
            >
              Price (PKR)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={handlePrice}
              required
              className="mt-2 w-half rounded-lg border-gray-700 p-4 text-sm shadow-sm"
              max="999999999"
            />
            <input
              type="number"
              name="value"
              disabled
              placeholder={priceWords}
              className="capitalize mx-10 w-[700px] h-4 border-gray-400 p-4 text-md shadow-sm"
            />
          </div>

          <p className="text-xl font-semibold font-medium underline dark:text-white decoration-gray-500 decoration-wavy">
            Property Title And Description
          </p>

          <div>
            <label
              for="title"
              className="pr-10 text-sm font-medium underline decoration-red-700 decoration-double"
            >
              Property Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              required
              value={propertyTitle}
              onChange={handlesetPropertyTitle}
              className="mt-2 block w-full rounded-lg border-gray-700 p-4 text-sm shadow-sm"
            />
          </div>

          <div>
            <label
              for="title"
              className="pr-10 text-sm font-medium underline decoration-red-700 decoration-double"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={handlesetDescription}
              id="message"
              rows="4"
              class="mt-2 block p-2.5 w-[700px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Property Description..."
              required
            ></textarea>
          </div>

          
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 underline decoration-red-700 decoration-double" for="file_input">Upload Property Photo</label>
    <input onChange={(e)=>{setImage(e.target.files[0]);console.log(e.target.files[0])}} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=' .png, .jpeg, .jpg' required/>
      {/* <div onClick={sendImage}>SEND IMAGE</div> */}

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
