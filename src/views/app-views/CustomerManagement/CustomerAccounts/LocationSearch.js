import React, { useEffect, useRef, useState } from "react";
import { AutoComplete, Input, message } from "antd";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const LocationSearch = ({ setLocationData} ) => {
    // console.log(value);
      const [query, setQuery] = useState();
      const autoCompleteRef = useRef(null);
    
      const handleScriptLoad = (updateQuery, autoCompleteRef) => {
        autoComplete = new window.google.maps.places.Autocomplete(
          autoCompleteRef.current,
          {
            // types: ["(cities)"],
            componentRestrictions: { country: "SGP" },
          }
        );
    
        autoComplete.addListener("place_changed", () => {
          handlePlaceSelect(updateQuery);
        });
      };
    
      const handlePlaceSelect = async (updateQuery) => {
          const addressObject = await autoComplete.getPlace();
        //   console.log(addressObject);
          const query = addressObject.formatted_address;      ;
          
        updateQuery(query);
          const latLng = {
          address:query,
          latitude: addressObject?.geometry?.location?.lat(),
          longitude: addressObject?.geometry?.location?.lng(),
        };
        setLocationData(latLng);
      };
    
      useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
          
        );
        console.log("searching...");
      }, []);
    
      return (
        <div >
          <input
            ref={autoCompleteRef}
            className="w-100 p-2 rounded z-100"
            style={{border: '2px solid rgb(230, 235, 241)'}}
            onChange={(event) => {
                console.log(event.target.value)
                setQuery(event.target.value)
            }}
            placeholder="Search Address ..."
            value={query}
          />
        </div>
      );
    };

export default LocationSearch