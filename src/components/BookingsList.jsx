function BookingsList() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  
    return (
      <div>
        <h2>Lista de Reservas</h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              {booking.name} - {booking.date}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default BookingsList;