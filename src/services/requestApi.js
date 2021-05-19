// REQUEST
import { api } from '../services/api'

const { REACT_APP_NASA_KEY } = process.env;

const request = { 
  getAsteroids: async (startDate, endDate) => 
  await api
    .get(`feed?start_date=${startDate}&end_date=${endDate}&api_key=${REACT_APP_NASA_KEY}`)
    .then((response) => {
      return response.data.near_earth_objects
    })
    .catch((error) => console.log(error))
 }

 export default request