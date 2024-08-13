import Geolocation from "@react-native-community/geolocation";

import { Location } from "../interface/Location";

export const getLocation = async():Promise<Location> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition((data) => {
      resolve({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      })
    }, (error) => {
      console.log('Error location');
      reject(error);
    })
  })
}
