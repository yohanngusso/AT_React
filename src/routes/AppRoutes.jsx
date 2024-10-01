import { Routes, Route } from 'react-router-dom';
import HotelsList from '../components/HotelList';
import HotelDetails from '../components/Details/HotelDetails';
import Forms from '../components/Forms';
import FavoriteHotels from '../components/FavoriteHotels';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HotelsList />} />
      <Route path="/hotels" element={<HotelsList />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/add-hotel" element={<Forms />} />
      <Route path="/favorites" element={<FavoriteHotels />} />
    </Routes>
  );
}

export default AppRoutes;