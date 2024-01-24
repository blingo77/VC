"use client";

import React, { useEffect, useState } from "react";
import "./Map.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";



const Maps = () => {
  const pos = { lat: 36.1716, lng: -115.1391 };
  const [searchPos, setSearchPos] = useState({lat: 36.1716, lng: -115.1391})

 
function search(){

    let location = document.getElementById('location-id').value
    console.log(location)

        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=4e3103f326a54fd9a8b163ab37edee9b`)
        .then(data =>{
            return data.json()
        })
        .then(data => {
            console.log(data.features[0].properties)
            console.log(data)
        
            let lan = data.features[0].properties.lat
            let lon = data.features[0].properties.lon
      
            setSearchPos({lat: lan, lng: lon})
    
            console.log(lan)
            console.log(lon)
            
        })
        .catch(e => {console.log(e)})
}
  
  return (
    <>
    <div className="main-map-container">
      <APIProvider apiKey="AIzaSyAUCSgCxCbZBXR1o8L5gy2cjJ0VnaO1OEY">
        <div className="map-container">
          <Map zoom={11} center={searchPos} mapId="d075fb289be0f43e">
            <AdvancedMarker position={searchPos}>
              <Pin
                background={"lightblue"}
                borderColor={"blue"}
                glyphColor={"white"}
              />
            </AdvancedMarker>

          </Map>
        </div>
      </APIProvider>
      <div className="map-search-container">
        <div className="search-container">
          <input placeholder="Search" id="location-id" ></input>
          <button onClick={search}>Search</button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Maps;
