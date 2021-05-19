import axios from 'axios'

export const apiKey = '4fUo1vx6eY0JIfeYoaMxrlGlWlM8ZpcoTzi7rQWs'

const version = "v1"

export const api = axios.create({
  baseURL:`https://api.nasa.gov/neo/rest/${version}/`
})