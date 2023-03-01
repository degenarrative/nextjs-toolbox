import React, { useState } from 'react';

const DatePicker = ({ onChange }) => {
  const [date, setDate] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setDate(value);
    onChange && onChange(value);
  };

  return (
    <div>
      <label htmlFor="date">Date of birth:</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default DatePicker;
