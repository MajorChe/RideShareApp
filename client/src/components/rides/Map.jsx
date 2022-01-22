import React, { useState, useEffect, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "./Map.css"
import { Checkbox, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, Stack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
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
  const handleChange = () => {
    props.updateOnly(!props.only);
  };
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
    props.updateSearch("clicked"); 
    
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
    setAddress("");
    setAddress2("");
    
    // setAddress(address);
    // setAddress2(address2);
    // props.updateAdress1(address);
    // props.updateAdress2(address2);

  //   props.updateSearch("");
 }

  const handleSelect = async value => {
    props.updateSearch("");
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(value);
    props.updateAdress1(value);


  };
  const handleSelect2 = async value => {
    props.updateSearch("");
    const results2 = await geocodeByAddress(value);
    const latLng2 = await getLatLng(results2[0]);
    setAddress2(value);
    setCoordinates2(latLng2);    
    props.updateAdress2(value);
  };
  const isError1 = address === '';
  const isError2 = address2 === '';

  return (

    <div className="top">
      <div className="container1">
        <div  class="form-horizontal">
          
          <PlacesAutocomplete class="input-group mb-3" 
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

              <div>                
                <FormControl isInvalid={isError1} >
                  <Input  value={props.address1} class="form-control" {...getInputProps({ placeholder: "From" })} />
                  {/* {/* {/* {!isError1 ? ( */}
                    <FormHelperText> 
                      Enter your pick up point
                     </FormHelperText>
                  {/* ) : (
                    <FormErrorMessage>From is required.</FormErrorMessage>
                  )} */}  
                  <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                      const style = {
                        backgroundColor: suggestion.active ? "#adb5bd" : "#fff"
                      };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
              </div>
            )}
          </PlacesAutocomplete>
          <br />
          <PlacesAutocomplete class="input-group mb-3"
            value={address2}
            onChange={setAddress2}
            onSelect={handleSelect2}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div >              
                <FormControl isInvalid={isError2}>
                  <Input class="form-control" {...getInputProps({ placeholder: "To" })} required />
                  {/* {!isError2 ? ( */}
                    <FormHelperText>
                      Enter your drop off point
                    </FormHelperText>
                  {/* //  ) : (
                  //   <FormErrorMessage> To is required.</FormErrorMessage>
                  // )}  */}

                  <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                      const style = {
                        backgroundColor: suggestion.active ? "#adb5bd" : "#fff"
                      };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
              </div>
            )}
          </PlacesAutocomplete>
          <br />
          <Stack direction='row'>
          <DatePicker placeholderText="Date"selected={props.selectedDate} onChange={date => props.updateSelectedDate(date)} minDate={new Date()} />
          <input type="checkbox" checked={props.only} onChange={handleChange}/>
          </Stack>
          <button id="submit" class="btn btn-dark" onClick={onSubmit}>
            Search
          </button>
          <br />
          <br /> <br />
          <br />

          <p>Distance: {distance} Duration: {duration}</p>
        </div>
      </div>
      <div id="map" style={{ height: "300px" }} >

        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_KEY
          }}
          defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
          defaultZoom={10}

          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => onLoad(map, maps)}
        >
        </GoogleMapReact>
        <br />


      </div>

    </div>
  );
}

export default Map;