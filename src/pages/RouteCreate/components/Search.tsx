import { Select } from 'antd';

const { Option } = Select;
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const SearchMap = ({ onSelect }: any) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({

    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });


  const mapOptions = data.map((suggestion) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;


    return <Option key={place_id} value={suggestion.description}>{main_text + " " + secondary_text}</Option>;
  });

  const onOptionSelect = (value) => {
    setValue(value, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: value })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        onSelect({ lat, lng, address: value });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };


  return <Select
    showSearch
    className="absolute z-10 w-72 top-2 right-16"
    placeholder="Search places."
    dropdownMatchSelectWidth
    defaultActiveFirstOption={false}
    showArrow={false}
    filterOption={false}
    onSearch={(query: string) => setValue(query)}
    notFoundContent={null}
    onSelect={onOptionSelect}
  >
    {mapOptions}
  </Select>;
};

export default SearchMap;
