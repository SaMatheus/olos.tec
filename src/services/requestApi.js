// REQUEST
import { api, apiKey } from '../services/api'

const request = { 
  getAsteroids: async (startDate, endDate) => 
  await api
    .get(`feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
    .then((response) => {
      return response.data.near_earth_objects
    })
    .catch((error) => console.log(error))
 }

 export default request