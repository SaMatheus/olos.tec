import axios from 'axios'

export const apiKey = '4fUo1vx6eY0JIfeYoaMxrlGlWlM8ZpcoTzi7rQWs'

export const api = axios.create({
  baseUrl:'https://api.nasa.gov/neo/rest/v1/feed?'
})