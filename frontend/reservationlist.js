import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const response = await axios.get('http://localhost:5000/reservations');
    setReservations(response.data);
  };

  const deleteReservation = async (id) => {
    await axios.delete(`http://localhost:5000/reservation/${id}`);
    fetchReservations();
  };

  const updateReservation = async (id) => {
    const name = prompt("Enter new name:");
    const bus = prompt("Enter new bus:");
    if (name && bus) {
      await axios.put(`http://localhost:5000/reservation/${id}`, { name, bus });
      fetchReservations();
    }
  };

  return (
    <ul>
      {reservations.map((reservation) => (
        <li key={reservation._id}>
          {reservation.name} - {reservation.bus}
          <button onClick={() => deleteReservation(reservation._id)}>Delete</button>
          <button onClick={() => updateReservation(reservation._id)}>Update</button>
        </li>
      ))}
    </ul>
  );
};

export default ReservationList;
