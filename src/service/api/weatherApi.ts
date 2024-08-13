import axios from "axios";

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    'appid': "a359ec078e422aa46173f5c5a56ed96a"
  }
})