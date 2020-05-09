const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA';

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=1&access_token=pk.eyJ1IjoibmdvY2NvbmciLCJhIjoiY2s3ZTZyYWhqMG1vOTNtcHRmY2Y3bjZxaiJ9.wv4JUsyhFHm4K6R8OQkXnQ'
  );

  const data = response.data;

  if (!data ) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = {
    lat: response.data.features[0].geometry.coordinates[0],
    lng: response.data.features[0].geometry.coordinates[1],
  }

  return coordinates;
}

module.exports = getCoordsForAddress;
