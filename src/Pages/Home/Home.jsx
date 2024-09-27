import { useEffect } from 'react';
import hotelAImage from '../../assets/imgs_hotel/hotel1/1.jpg';
import hotelA2Image from '../../assets/imgs_hotel/hotel1/2.jpg';

function Home() {
  useEffect(() => {
    // Verificar se os hotéis já estão salvos no localStorage
    const hotelsInStorage = localStorage.getItem('hotels');
    console.log(hotelsInStorage);
    
    if (!hotelsInStorage) {
      const initialHotels = [
        {
          name: 'Hotel A',
          image: 'src/assets/imgs_hotel/hotel1/1.jpg',
          stars: 5,
          city: 'Cidade A',
          state: 'Estado A',
          price: 100,
          description: 'lorem.',
          additionalImages: [
            hotelA2Image,
            hotelA2Image,
            hotelA2Image,
            hotelA2Image,
            hotelA2Image
          ],
          services: 'WiFi, Piscina, Academia'
        },
        {
          name: 'Hotel B',
          image: 'src/assets/imgs_hotel/hotel1/1.jpg',
          stars: 4,
          city: 'Cidade B',
          state: 'Estado B',
          price: 80,
          description: 'lorem.',
          additionalImages: [
            hotelAImage,
            hotelAImage,
            hotelAImage,
            hotelAImage
          ],
          services: 'WiFi, Piscina, Academia'
        },
        // Adicione mais hotéis conforme necessário
      ];
      localStorage.setItem('hotels', JSON.stringify(initialHotels));
    }
  }, []);

  return null; 
}

export default Home;
