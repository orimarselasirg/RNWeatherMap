import { useEffect, useState }  from 'react'
import { MapPressEvent }        from 'react-native-maps';
import { getMarkersData }       from '../../utils/sqlLite';
import { getWeatherData }       from '../../service/Services/weatherServices';
import { Markers }              from '../../interface/Markers';

export const useMap = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading]       = useState<boolean>(false);
  const [change, setChange]   = useState<boolean>(true);
  const [markers, setMarkers] = useState<Markers[]>([])
  const [marker, setMarker]   = useState<Markers>({
      latitude:     0,
      longitude:    0,
      name:         '',
      descrption:   '',
      icon:         '',
      tempereture:  0
  })

  useEffect(()=>{
    if(change){
      getDatabseMarkers()
      setChange(false)
    }
  },[change])

  const getDatabseMarkers = async() => {
    setMarkers([])
    try {
      setIsLoading(true)
      const markersDb = await getMarkersData('markers')
      if(markersDb.length > 0) {
        setMarkers(markersDb)
      }
    } catch (error) {
      console.log({error});
    } finally {
      setIsLoading(false)
    }
  }
  
  const getMarker = async (event: MapPressEvent) => {
    const coordinates = event.nativeEvent.coordinate
    
    try {
      setIsLoading(true)
      const weatherData: Markers = await getWeatherData({latitude: coordinates.latitude, longitude: coordinates.longitude})
      setMarkers([...markers,{
        descrption:   weatherData.name,
        icon:         weatherData.icon,
        latitude:     weatherData.latitude,
        longitude:    weatherData.longitude,
        name:         weatherData.name,
        tempereture:  weatherData.tempereture
      }])
      
    } catch (error) {
      console.log({error});
    } finally {
      setIsLoading(false)
    }
  }

  const openModal = (marker: Markers) => {
    setModalVisible(!modalVisible)
    setMarker(marker)
  }
  return {
    getMarker,
    marker,
    markers,
    modalVisible,
    openModal,
    setModalVisible,
    setChange,
    isLoading
  }
}
