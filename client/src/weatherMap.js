import React, { useEffect } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const WeatherMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([7.8731, 80.7718], 8);

    // Add the base map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const gpsIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    // Function to add markers for weather stations
    const addWeatherStations = async () => {
      // Fetch weather data for 25 districts (replace with actual coordinates)
      const districtCoordinates = [
        // Example: [latitude, longitude, districtName]
 [6.9271, 79.8612, 'Colombo'],
 [7.8731, 80.7718, 'Kandy'],
 [6.0535, 80.2202, 'Galle'],
 [9.6615, 80.0255, 'Trincomalee'],
 [8.5756, 81.2152, 'Jaffna'],
 [6.2950, 80.6504, 'Kalutara'],
 [7.9804, 80.6956, 'Matale'],
 [7.2964, 80.6350, 'Nuwara Eliya'],
 [6.4211, 80.5767, 'Gampaha'],
 [7.5560, 80.3774, 'Kegalle'],
 [6.9214, 81.1070, 'Matara'],
 [6.6930, 81.4926, 'Hambantota'],
 [7.4958, 81.0288, 'Badulla'],
 [6.1340, 80.0998, 'Puttalam'],
 [9.3977, 80.4037, 'Batticaloa'],
 [8.5810, 81.2156, 'Vavuniya'],
 [8.5671, 81.2330, 'Mannar'],
 [7.9939, 81.0458, 'Anuradhapura'],
 [6.7970, 81.4808, 'Tangalle'],
 [8.0447, 79.6630, 'Kilinochchi'],
 [8.7500, 80.5000, 'Polonnaruwa'],
 [8.9500, 79.7333, 'Mullaitivu'],
 [6.7167, 81.8333, 'Moneragala'],
 [9.6647, 80.0057, 'Ampara'],
 [6.2850, 81.0750, 'Kurunegala']
      
      ];

      for (const [lat, lon, district] of districtCoordinates) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a086e176cfa6c37ba4d049f657d61dbd`
          );
          const data = await response.json();

          // Extract relevant weather information
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          const airPressure = data.main.pressure;

          // Create marker and bind popup
          const marker = L.marker([lat, lon], { icon: gpsIcon }).addTo(map);
          marker.bindPopup(`
            <b>${district}</b><br>
            Temperature: ${temperature}°C<br>
            Humidity: ${humidity}%<br>
            Air Pressure: ${airPressure} hPa
          `);
        } catch (error) {
          console.error(`Error fetching weather data for ${district}:`, error);
        }
      }
    };

    // Call the function to add weather stations
    addWeatherStations();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default WeatherMap;

