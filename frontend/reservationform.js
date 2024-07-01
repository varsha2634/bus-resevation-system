import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [bus, setBus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/reservation', { name, bus });
    setName('');
    setBus('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Bus"
        value={bus}
        onChange={(e) => setBus(e.target.value)}
        required
      />
      <button type="submit">Add Reservation</button>
    </form>
  );
};

export default ReservationForm;
