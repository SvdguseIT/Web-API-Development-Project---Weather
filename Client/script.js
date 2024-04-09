// client/script.js

// Dummy data for demonstration
const districtsData = [
    { name: 'Colombo', temperature: 30, humidity: 80, airPressure: 1012 },
    { name: 'Galle', temperature: 28, humidity: 75, airPressure: 1010 },
    { name: 'Kandy', temperature: 25, humidity: 70, airPressure: 1015 },
    // Add more districts data here as needed
  ];
  
  // Function to update weather information based on selected district
  const updateWeatherInfo = (district) => {
    const selectedDistrict = districtsData.find(data => data.name === district);
    if (selectedDistrict) {
      const weatherInfo = `
        <h2>${district} Weather Information</h2>
        <ul>
          <li>Temperature: ${selectedDistrict.temperature}°C</li>
          <li>Humidity: ${selectedDistrict.humidity}%</li>
          <li>Air Pressure: ${selectedDistrict.airPressure} mbar</li>
        </ul>
      `;
      document.getElementById('weather-info').innerHTML = weatherInfo;
    } else {
      document.getElementById('weather-info').innerHTML = '<p>No data available for this district</p>';
    }
  };
  
  // Function to handle click event on the map
  const handleMapClick = (event) => {
    const clickedDistrict = event.target.getAttribute('data-district');
    if (clickedDistrict) {
      updateWeatherInfo(clickedDistrict);
    }
  };
  
  // Add event listener for click event on the map
  document.getElementById('map').addEventListener('click', handleMapClick);
  
  // Render the map with clickable districts
  const renderMap = () => {
    const map = document.getElementById('map');
    map.innerHTML = `
      <svg width="800" height="600">
        <!-- Districts -->
        <rect x="50" y="50" width="100" height="100" fill="lightblue" data-district="Colombo"></rect>
        <rect x="200" y="50" width="100" height="100" fill="lightblue" data-district="Gampaha"></rect>
        <rect x="350" y="50" width="100" height="100" fill="lightblue" data-district="Kalutara"></rect>
        <rect x="500" y="50" width="100" height="100" fill="lightblue" data-district="Kandy"></rect>
        <rect x="650" y="50" width="100" height="100" fill="lightblue" data-district="Nuwara Eliya"></rect>
  
        <rect x="50" y="200" width="100" height="100" fill="lightgreen" data-district="Galle"></rect>
        <rect x="200" y="200" width="100" height="100" fill="lightgreen" data-district="Matara"></rect>
        <rect x="350" y="200" width="100" height="100" fill="lightgreen" data-district="Hambantota"></rect>
        <rect x="500" y="200" width="100" height="100" fill="lightgreen" data-district="Monaragala"></rect>
        <rect x="650" y="200" width="100" height="100" fill="lightgreen" data-district="Ratnapura"></rect>
  
        <rect x="50" y="350" width="100" height="100" fill="lightcoral" data-district="Mannar"></rect>
        <rect x="200" y="350" width="100" height="100" fill="lightcoral" data-district="Vavuniya"></rect>
        <rect x="350" y="350" width="100" height="100" fill="lightcoral" data-district="Mullaitivu"></rect>
        <rect x="500" y="350" width="100" height="100" fill="lightcoral" data-district="Kilinochchi"></rect>
        <rect x="650" y="350" width="100" height="100" fill="lightcoral" data-district="Jaffna"></rect>
  
        <!-- Add more districts here as needed -->
  
      </svg>
    `;
  };
  
  // Call the function to render the map
  renderMap();
  