import { APIKEY_WEATHER, BASE_URL } from "@env";
import axios from "axios";

console.log(BASE_URL);

export const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    'appid': APIKEY_WEATHER
  }
})