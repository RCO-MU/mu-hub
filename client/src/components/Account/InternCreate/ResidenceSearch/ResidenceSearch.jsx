import * as React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './ResidenceSearch.css';

export default function ResidenceSearch({ residence, setResidence }) {
  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleSelect = async (value) => {
    const geocode = await geocodeByAddress(value);
    const latLng = await getLatLng(geocode[0]);
    setResidence({
      name: value,
      latitude: latLng.lat,
      longitude: latLng.lng,
    });
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="ResidenceSearch">
      <PlacesAutocomplete
        value={residence.name ? residence.name : residence}
        onChange={setResidence}
        onSelect={handleSelect}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div>
            <input
              className="input-field res"
              {...getInputProps({
                placeholder: 'Search Places...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, idx) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={idx}
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
  );
}
