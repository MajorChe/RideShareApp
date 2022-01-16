import React, { useState, useEffect, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "./Map.css"

function Map(props) {
  console.log(props);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  const [coordinates2, setCoordinates2] = React.useState({
    lat: null,
    lng: null
  });

  const onLoad = useCallback(function callback(map) {

    const google = window.google;
    var mapProp = {
      center: new google.maps.LatLng(38, -78),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    new google.maps.Map(document.getElementById('map'), mapProp);
  }, []);


  const onSubmit = (e) => {
    // Get directions

    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    console.log(address);

    var mapProp = {
      center: new google.maps.LatLng(38, -78),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map1 = new google.maps.Map(document.getElementById('map'), mapProp);
    directionsRenderer.setMap(map1);
    directionsService.route(
      {
        origin: address,
        destination: address2,
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          console.log((result.routes[0].legs[0].distance.value) / 1000)
          setDistance((result.routes[0].legs[0].distance.value) / 1000);
          setDuration((result.routes[0].legs[0].duration.value) / 60);
        } else {
          console.error("error fetching directions", result, status);
        }
      }
    );
  }

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(value);
    props.updateAdress1(value);
    
    
  };
  const handleSelect2 = async value => {
    const results2 = await geocodeByAddress(value);
    const latLng2 = await getLatLng(results2[0]);
    setAddress2(value);   
    setCoordinates2(latLng2);  
    props.updateAdress2(value);  
  };

  return (

    <div className="top">
      <div className="container1">
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            
            <div>
              {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}

              <input {...getInputProps({ placeholder: "From" })} />
           
              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                  };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <PlacesAutocomplete
          value={address2}
          onChange={setAddress2}
          onSelect={handleSelect2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              {/* <p>Latitude: {coordinates2.lat}</p>
            <p>Longitude: {coordinates2.lng}</p> */}

              <input {...getInputProps({ placeholder: "To" })} />

              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                  };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div>Distance: {distance}</div>
        <div>Duration: {duration}</div>
        <button id="submit" onClick={onSubmit}>
          Search
        </button>
      </div>

      <div id="map" style={{ height: "400px", width: "40%" }} >

        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBnoR42T2Mlxti728TT6tx04NqSwwMgsik"
          }}
          defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
          defaultZoom={10}

          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => onLoad(map, maps)}
        >
        </GoogleMapReact>

      </div>

    </div>
  );
}

export default Map;