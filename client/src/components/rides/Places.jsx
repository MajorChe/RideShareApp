import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

function Places(props) {

  const [address, setAddress] = useState("");

  const handleSelect = async value => {
    const results2 = await geocodeByAddress(value);    
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);    
    console.log("val",value);
    props.updateAdress(value);   
  };

  return (
    <PlacesAutocomplete class="input-group mb-3"
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

        <div>         
          <input class="form-control" {...getInputProps({ placeholder: props.location })} />
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


    </PlacesAutocomplete>)
}

export default Places;