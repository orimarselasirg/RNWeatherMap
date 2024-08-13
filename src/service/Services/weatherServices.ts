import { weatherApi }       from "../api/weatherApi";
import { WeatherResponse }  from "../entities/weather.entities";
import { Markers }          from "../../interface/Markers";
import { Location }         from "../../interface/Location";

export const getWeatherData = async ({latitude, longitude}: Location): Promise<Markers> => {
  try {
    const{data} = await weatherApi.get<WeatherResponse>(`?lat=${latitude}&lon=${longitude}`)
    return {
      latitude:     data.coord.lat,  
      longitude:    data.coord.lon,
      name:         data.name,
      descrption:   data.weather[0].description,
      icon:         data.weather[0].icon,
      tempereture:  data.main.temp, 
    }
  } catch (error) {
    console.log({error});
    throw error
  }
}
