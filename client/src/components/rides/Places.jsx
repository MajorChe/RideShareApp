import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';

function Places(props) {

  const [address, setAddress] = useState("");

  const handleSelect = async value => {
    const results2 = await geocodeByAddress(value);
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log("val", value);
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
          <FormControl isInvalid={isError}>

            <Input class="form-control" {...getInputProps({ placeholder: props.location })} />
            {!isError ? (
              <FormHelperText>
                Enter your {props.place} point
              </FormHelperText>
            ) : (
              <FormErrorMessage>{props.place} location is required.</FormErrorMessage>
            )}

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


    </PlacesAutocomplete>)
}

export default Places;