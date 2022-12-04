import React, { useState,useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { ToWords } from "to-words";

import { supabase } from '../supabaseClient'

import { Navigate, useNavigate } from "react-router-dom";

import { LoginContext } from '../Contexts/LoginContext';

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

  const {loggedIn,SetloggedIn,userID,userType,setuserID,setuserType} = useContext(LoginContext);

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

  const [bedrooms,setbedrooms] = useState(0);

  const [addresselected,setAS] = useState(false);
  const [ASmessage,setASmessage] = useState("");


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

      if(addresselected===false){
        setASmessage("Please Select an Address from the dropdown!");
        return;
      }

      //adduseruuid********************************

      supabase
     .storage
     .from('properties')
     .upload(`${userID}${selectedImage.name}`+Math.random(), selectedImage)
     .then(value=>{
      console.log("Sent!: ",value.data.path);
      setimagePath(value.data.path);

      Getimageurl(value.data.path).then((valueurl)=>{

        console.log(value);

    supabase.auth.getSession().then((value)=>{

    
        
        supabase.from('properties')
        .insert({
          Owner_uuid: value.data.session.user.id,
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
          ImagePath: valueurl,
          Status: 'Pending',
          neighbourhood: neighbourhood,
          sublocal1: sublocality_level_1,
          sublocal2: sublocality_level_2,
          landmark: landMark,
          Bedrooms: bedrooms
  
        })
        .then(value=>{
          console.log("data saved :",value);
          navigate("/MemberPortal/ViewListing")

          })
        })
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
    setAS(false);
    //for udating your writing in input box.
  };

  const handlebedrooms = (e)=>{
    setbedrooms(e.target.value)
  }

  const handleSelect = (address) => {
    setAS(true);
    setASmessage("");
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
        <h1 className="text-center text-2xl font-bold text-rose-600 sm:text-3xl">
          Lets Add A New Listing!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Please fill out all the{" "}
          <b className="">
            necessary<span className="text-red-900">*</span>
          </b>{" "}
          details
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6  mb-0 space-y-4 rounded-lg p-8 shadow-2xl"
        >
          <p className="text-xl font-semibold font-medium  dark:text-white decoration-gray-500 decoration-wavy">
            Purpose, Property Type And Location
          </p>

          <div>
            <label
              for="purpose"
              className="text-sm font-medium "
            >
              Purpose <span className="text-red-900">*</span>
            </label>

            <div className="mt-2 mb-2 flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                id="bordered-radio-1"
                type="radio"
                value="Sale"
                name="bordered-radio"
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
              className="text-sm font-medium "
            >
              Property Type <span className="text-red-900">*</span>
            </label>

            <div className="mt-2 mb-2 flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
              <input
                onChange={handlePropertyType}
                id="bordered-radio-11"
                type="radio"
                value="Homes"
                name="bordered-radio-2"
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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

          <div>
            <label
              for="email"
              className="text-sm font-medium "
            >
              Location <span className="text-red-900">*</span>
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
            </PlacesAutocomplete><span class="mt-3 text-red-900 font-black">{ASmessage}</span>
          </div>

          <p className="text-xl font-semibold font-medium  dark:text-white decoration-gray-500 decoration-wavy">
            Property Specs And Price
          </p>

          <div>
            <label
              for="AreaUnits"
              className="pr-10 text-sm font-medium "
            >
              Area Units <span className="text-red-900">*</span>
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
              className="pr-10 text-sm font-medium "
            >
              Occupancy Status <span className="text-red-900">*</span>
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
              className="block pr-10 text-sm font-medium "
            >
              Price (PKR) <span className="text-red-900">*</span>
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

          <div>
            <label
              for="price"
              className="block pr-10 text-sm font-medium "
            >
              Bedrooms <span className="text-red-900">*</span>
            </label>
            <input
              type="number"
              name="title"
              placeholder="Bedrooms#"
              required
              value={bedrooms}
              onChange={handlebedrooms}
              className="mt-2 block w-[150px] rounded-lg border-gray-700 p-4 text-sm shadow-sm"
            />
            
            
          </div>

          <p className="text-xl font-semibold font-medium  dark:text-white decoration-gray-500 decoration-wavy">
            Property Title And Description
          </p>

          <div>
            <label
              for="title"
              className="pr-10 text-sm font-medium "
            >
              Property Title <span className="text-red-900">*</span>
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
              className="pr-10 text-sm font-medium "
            >
              Description <span className="text-red-900">*</span>
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

          
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 " for="file_input">Upload Property Photo<span className="text-red-900">*</span></label>
    <input onChange={(e)=>{setImage(e.target.files[0]);console.log(e.target.files[0])}} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=' .png, .jpeg, .jpg' required/>
      {/* <div onClick={sendImage}>SEND IMAGE</div> */}

          <button
            type="submit"
            className="block w-full rounded-lg bg-rose-600 px-5 py-3 text-sm font-medium text-white"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
