import axios from 'axios'

const version = "v1"

export const api = axios.create({
  baseURL:`https://api.nasa.gov/neo/rest/${version}/`
})