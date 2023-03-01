import React, { useState } from 'react';

const LocationPicker = ({ onChange }) => {
  const [location, setLocation] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setLocation(value);
    onChange && onChange(value);
  };

  return (
    <div>
      <label htmlFor="location">Location of birth:</label>
      <input
        id="location"
        type="text"
        value={location}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default LocationPicker;
