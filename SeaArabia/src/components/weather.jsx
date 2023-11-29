import axios from 'axios';

const API_KEY = 'a656047a4570412788e111327232711'; // Replace with your actual API key
const API_URL = 'https://api.weatherapi.com/v1/current.json';

const getWeatherDataByCoordinates = async (latitude,longitude) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: `${latitude},${longitude}`,
      },
    });
     console.log('Weather Data:', response.data);
    
    // You can return the data or use it as needed in your application
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching weather data:', error);
    throw error; // You may want to handle the error more gracefully in your application
  }
};

export default getWeatherDataByCoordinates;

