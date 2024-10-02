// Importando as imagens para não dar erro no vercel
import hotel1Image1 from '../assets/imgs_hotel/hotel1/1.jpg';
import hotel1Image2 from '../assets/imgs_hotel/hotel1/2.jpg';
import hotel1Image3 from '../assets/imgs_hotel/hotel1/3.jpg';
import hotel1Image4 from '../assets/imgs_hotel/hotel1/4.jpg';
import hotel1Image5 from '../assets/imgs_hotel/hotel1/5.jpg';

import hotel2Image1 from '../assets/imgs_hotel/hotel2/1.jpg';
import hotel2Image2 from '../assets/imgs_hotel/hotel2/2.jpg';
import hotel2Image3 from '../assets/imgs_hotel/hotel2/3.jpg';
import hotel2Image4 from '../assets/imgs_hotel/hotel2/4.jpg';
import hotel2Image5 from '../assets/imgs_hotel/hotel2/5.jpg';

import hotel3Image1 from '../assets/imgs_hotel/hotel3/1.jpg';
import hotel3Image2 from '../assets/imgs_hotel/hotel3/2.jpg';
import hotel3Image3 from '../assets/imgs_hotel/hotel3/3.jpg';
import hotel3Image4 from '../assets/imgs_hotel/hotel3/4.jpg';
import hotel3Image5 from '../assets/imgs_hotel/hotel3/5.jpg';

// Definindo os hotéis com as variáveis de imagem
const defaultHotels = [
  {
    name: "Meliá Paulista",
    image: hotel1Image1,
    city: "São Paulo",
    state: "SP",
    price: 900,
    description: "O Meliá Paulista fica a 600 metros do MASP e 1,2 km do Estádio do Pacaembu. O Aeroporto de São Paulo - Congonhas é o mais próximo, localizado a 8 km da acomodação.",
    additionalImages: [hotel1Image2, hotel1Image3, hotel1Image4, hotel1Image5],
    services: "Wi-Fi, Café da manhã, Piscina",
    stars: 3
  },
  {
    name: "Morada do Estaleiro",
    image: hotel2Image1,
    city: "Balneário Camboriú",
    state: "SC",
    price: 762,
    description: "A Morada do Estaleiro fica a 10 km do Camelódromo Balneário Camboriú e do teleférico. O aeroporto mais próximo é o Aeroporto Internacional Ministro Victor Konder, a 24 km da pousada.",
    additionalImages: [hotel2Image2, hotel2Image3, hotel2Image4, hotel2Image5],
    services: "Wi-Fi, Estacionamento, Academia",
    stars: 5
  },
  {
    name: "Windsor Copa Hotel",
    image: hotel3Image1,
    city: "Rio de Janeiro",
    state: "RJ",
    price: 1200,
    description: "O Windsor Copa Hotel fica a 25 km do Aeroporto Internacional do Galeão. O Estádio do Maracanã e o Cristo Redentor estão a 13 km do hotel, enquanto o Pão de Açúcar fica a 3,5 km.",
    additionalImages: [hotel3Image2, hotel3Image3, hotel3Image4, hotel3Image5],
    services: "Wi-Fi, Restaurante, Spa",
    stars: 4
  }
  // Pode ser adicionado outros hotéis aqui
];

export default defaultHotels;