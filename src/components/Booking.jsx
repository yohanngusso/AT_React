import { useState } from 'react';

function Booking() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleBooking = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push({ name, date });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Reserva feita com sucesso!');
  };

  return (
    <div>
      <h2>Fazer uma Reserva</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
}

export default Booking;