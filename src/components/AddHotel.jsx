import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddHotel.css'; // Importar o arquivo CSS específico

function AddHotel() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [stars, setStars] = useState(1);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!image) newErrors.image = 'Image URL is required';
    if (stars < 1 || stars > 5) newErrors.stars = 'Stars must be between 1 and 5';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!description) newErrors.description = 'Description is required';
    if (!services) newErrors.services = 'Services are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const newHotel = {
      name,
      image,
      stars,
      city,
      state,
      price,
      description,
      services,
      additionalImages: []
    };
    try {
      const hotels = JSON.parse(localStorage.getItem('hotels')) || [];
      hotels.push(newHotel);
      localStorage.setItem('hotels', JSON.stringify(hotels));
      setMessage('Hotel added successfully!');
      setTimeout(() => navigate('/hotels'), 2000);
    } catch {
      setMessage('Failed to save hotel. Please try again.');
    }
  };

  return (
    <div className="add-hotel">
      <h2>Add New Hotel</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
          {errors.image && <span className="error">{errors.image}</span>}
        </label>
        <label>
          Stars:
          <input type="number" value={stars} onChange={(e) => setStars(e.target.value)} min="1" max="5" />
          {errors.stars && <span className="error">{errors.stars}</span>}
        </label>
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          {errors.city && <span className="error">{errors.city}</span>}
        </label>
        <label>
          State:
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          {errors.state && <span className="error">{errors.state}</span>}
        </label>
        <label>
          Price per Night:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>
        <label>
          Services:
          <textarea value={services} onChange={(e) => setServices(e.target.value)} />
          {errors.services && <span className="error">{errors.services}</span>}
        </label>
        <button type="submit">Add Hotel</button>
      </form>
    </div>
  );
}

export default AddHotel;