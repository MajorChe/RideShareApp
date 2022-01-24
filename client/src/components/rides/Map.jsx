import React, { useState, useEffect, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  Button,
  chakra,
  Checkbox,
  Flex,
  FormControl,
  Icon,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Container,
  Box,
  Center,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { MdMyLocation, MdEditCalendar } from "react-icons/md";
import { TiLocationArrowOutline } from "react-icons/ti";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const Map = (props) => {
  console.log(props);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [coordinates2, setCoordinates2] = React.useState({
    lat: null,
    lng: null,
  });
  const handleChange = () => {
    props.updateOnly(!props.only);
  };
  const onLoad = useCallback(function callback() {
    const google = window.google;
    let mapProp = {
      center: new google.maps.LatLng(43.6, -79.3),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    new google.maps.Map(document.getElementById("map"), mapProp);
  }, []);

  const onSubmit = (e) => {
    // Get directions
    props.updateSearch("clicked");

    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    console.log(address);

    let mapProp = {
      center: new google.maps.LatLng(38, -78),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    let map1 = new google.maps.Map(document.getElementById("map"), mapProp);
    directionsRenderer.setMap(map1);
    directionsService.route(
      {
        origin: address,
        destination: address2,
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          console.log(result.routes[0].legs[0].distance.value / 1000);
          setDistance(result.routes[0].legs[0].distance.value / 1000);
          setDuration(result.routes[0].legs[0].duration.value / 60);
        } else {
          console.error("error fetching directions", result, status);
        }
      }
    );
    setAddress("");
    setAddress2("");
  };

  const handleSelect = async (value) => {
    props.updateSearch("");
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(value);
    props.updateAdress1(value);
  };
  const handleSelect2 = async (value) => {
    props.updateSearch("");
    const results2 = await geocodeByAddress(value);
    const latLng2 = await getLatLng(results2[0]);
    setAddress2(value);
    setCoordinates2(latLng2);
    props.updateAdress2(value);
  };
  const isError1 = address === "";
  const isError2 = address2 === "";

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCordinates,
        handleLocationErrors
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const handleLocationErrors = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert(
          "User denied the request for Geolocation.Please enter the adress manually"
        );
        break;
      case error.POSITION_UNAVAILABLE:
        alert(
          "Location information is unavailable.Please enter the adress manually"
        );
        break;
      case error.TIMEOUT:
        alert(
          "The request to get user location timed out.Please enter the adress manually"
        );
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.Please enter the adress manually");
        break;
      default:
        alert("An unknown error occurred.Please enter the adress manually");
    }
  };
  const reverseGeocode = (latitude, longitude) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("result", data.results[0].formatted_address);
        setAddress(data.results[0].formatted_address);
      })
      .catch((err) => alert("error"));
  };
  const getCordinates = (position) => {
    console.log("position", position);
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    reverseGeocode(lat, lng);
  };

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button onClick={onClick} width={"135px"} colorScheme='teal' variant={"outline"}>
      DATE:  
      {value}
    </Button>
  );

  return (
     <Container maxW={'8xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} mt={"10px"}>
        <Stack spacing={5} mt={"60px"}>
            <Flex>
              <Icon as={TiLocationArrowOutline} w={8} h={8} color="red.500" />
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <FormControl isInvalid={isError1}>
                    <Input
                      value={props.address1}
                      class="form-control"
                      {...getInputProps({ placeholder: "From" })}
                      w={"393px"}
                      border={"2px solid black"}
                    />
                    <chakra.div style={{position: "absolute", zIndex: 10}}>
                      {loading ? <chakra.div>...loading</chakra.div> : null}

                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active ? "teal" : "#fff",
                          color: suggestion.active ? "white" : "black",
                        };

                        return (
                          <chakra.div
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </chakra.div>
                        );
                      })}
                    </chakra.div>
                    <Button ml={2} onClick={getLocation}>
                      <Icon as={MdMyLocation} />
                    </Button>
                  </FormControl>
                )}
              </PlacesAutocomplete>
            </Flex>
            <br />
            <Flex>
              <Icon as={TiLocationArrowOutline} w={8} h={8} color="green.500" />
              <PlacesAutocomplete
                value={address2}
                onChange={setAddress2}
                onSelect={handleSelect2}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <chakra.div>
                    <FormControl isInvalid={isError2}>
                      <Input
                        class="form-control"
                        {...getInputProps({ placeholder: "To" })}
                        required
                        w={"393px"}
                        border={"2px solid black"}
                      />
                      <chakra.div style={{position: "absolute", zIndex: 10}}>
                        {loading ? <chakra.div>...loading</chakra.div> : null}

                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active
                              ? "teal"
                              : "#fff",
                            color: suggestion.active ? "white" : "black",
                          };

                          return (
                            <chakra.div
                              {...getSuggestionItemProps(suggestion, { style })}
                            >
                              {suggestion.description}
                            </chakra.div>
                          );
                        })}
                      </chakra.div>
                    </FormControl>
                  </chakra.div>
                )}
              </PlacesAutocomplete>
            </Flex>
            <br />
            <Flex >
            <Flex width={"320px"} ml={"40px"} mt={"7px"}>
              <input
                type="checkbox"
                checked={props.only}
                onChange={handleChange}
                style={{marginTop: "3px", zoom: 1.5}}
              />
              <Text fontSize={"19.5px"} ml={2} color={"teal.800"}>Show Exact Match</Text>
            </Flex>
            <Icon as={MdEditCalendar} w={6} h={10} ml={5} mr={4} color="blue.500" />
              <DatePicker
                selected={props.selectedDate}
                onChange={(date) => props.updateSelectedDate(date)}
                minDate={new Date()}
                customInput={<ExampleCustomInput/>}
              />
            </Flex>
            <Box paddingLeft={"30px"}>
            <Button _hover={{textDecoration: "none"}} padding={8} fontSize={"3xl"} fontWeight={"medium"} id="submit" onClick={onSubmit} width={"390px"} bgColor={"teal"} color={"white"}>
              Search
            </Button>
            </Box>
            <br />
        </Stack>
        <Flex flex={1} id="map" height={"400px"}  border={"5px solid black"} direction={"column"}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_API_KEY,
            }}
            defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => onLoad(map, maps)}
          ></GoogleMapReact>
        </Flex>
        
        </SimpleGrid>
        <Center mt={"30px"} fontSize={"20px"}>
            Distance: {distance} Duration: {duration}
          </Center>
      </Container>
  );
};

export default Map;
