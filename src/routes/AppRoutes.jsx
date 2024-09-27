import { Routes, Route } from 'react-router-dom';
import HotelsList from '../components/HotelsList';
import HotelDetails from '../components/Details/HotelDetails';
import AddHotel from '../components/AddHotel';
import EditHotel from '../components/EditHotel';
import FavoriteHotels from '../components/FavoriteHotels';
import NotFound from '../components/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HotelsList />} />
      <Route path="/hotels" element={<HotelsList />} />
      <Route path="/hotel-details/:id" element={<HotelDetails />} />
      <Route path="/add-hotel" element={<AddHotel />} />
      <Route path="/edit-hotel/:id" element={<EditHotel />} />
      <Route path="/favorites" element={<FavoriteHotels />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;