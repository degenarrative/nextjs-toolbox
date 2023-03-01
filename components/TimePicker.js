import React, { useState } from 'react';

const TimePicker = ({ onChange }) => {
  const [time, setTime] = useState('00:00');

  const handleChange = (event) => {
    const { value } = event.target;
    setTime(value);
    onChange && onChange(value);
  };

  return (
    <div>
      <label htmlFor="time">Time of birth:</label>
      <input
        id="time"
        type="time"
        value={time}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default TimePicker;
