import { usePlacesWidget } from 'react-google-autocomplete';

const LocationPicker = ({ location, setLocation }) => {
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: 'Input connors key here ',
    onPlaceSelected: (place) => {
      setLocation(place.formatted_address);
    },
    options: {
      fields: ['formatted_address', 'geometry', 'name'],
      strictBounds: false,
      types: ['establishment'],
    },
  });

  return (
    <input
      ref={ref}
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    ></input>
  );
};

export default LocationPicker;
