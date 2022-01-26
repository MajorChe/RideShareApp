import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
  Input,
  FormControl,
} from '@chakra-ui/react';

const Places = (props) => {

  const [address, setAddress] = useState("");

  const handleSelect = async value => {
    const results2 = await geocodeByAddress(value);
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    props.updateAdress(value);
  };
  const isError = address === '';

  return (
    <PlacesAutocomplete class="input-group mb-3"
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

        <div>
          <FormControl >
               
            <Input isInvalid={props.isErrorPlace} name={props} class="form-control" {...getInputProps({ placeholder: props.location })} w={"750px"} />
         
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "black" : "#fff",
                  color:suggestion.active ?  "#fff" :"black"
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


    </PlacesAutocomplete>)
}

export default Places;