import { useRef }                                         from 'react'
import MapView, {Marker, PROVIDER_GOOGLE}                 from 'react-native-maps';
import { ScrollView, StyleSheet, Text, TouchableOpacity}  from 'react-native';

import { Markers }        from '../../interface/Markers';
import { ModalComponent } from '../Modal/Modal';
import { useMap }         from './useMap';
import { CustomMarker }   from '../CustomMarker/CustomMarker';
import { Loading }        from '../ Loading/Loading';
import { Location }       from '../../interface/Location';
// import { APIKEY_WEATHER } from '@env';

interface Props {
  latitude:   number;
  longitude:  number;
  show:       boolean;
}

export const Map = (location: Props) => {

const {
  getMarker,
  markers,
  openModal,
  modalVisible,
  setModalVisible,
  marker,
  setChange,
  isLoading
} = useMap()

  const mapRef = useRef<MapView | null>(null);

  if(!location.show) return null

  const centerMap = (coordinate: Location) => {
    if(mapRef.current) {
      mapRef.current.animateToRegion({
        ...coordinate,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }
  };

  // console.log({APIKEY_WEATHER})

  return (
    <>
      <MapView
        ref={map =>mapRef.current = map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        zoomControlEnabled
        onPress={getMarker}
        style={{flex: 1}}
        initialRegion={{
          latitude:       location.latitude,
          longitude:      location.longitude,
          latitudeDelta:  0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          markers.map((marker: Markers, index: number) => (
            <Marker
            key=          {index}
            onPress=      {()=>openModal(marker)}
            coordinate=   {marker}
            title=        {marker.name}
            description=  {`(${marker.latitude.toFixed(2)}) - (${marker.longitude.toFixed(2)})`}
            >
              <CustomMarker icon={marker.icon}/>
            </Marker>
          ))
        }
      </MapView>
      
      <Loading isLoading={isLoading}/>

      <ScrollView
        style={styles.scrollViewContainer}
        persistentScrollbar
      >
        {
          markers.map((marker: Markers, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={()=>centerMap({latitude: marker.latitude, longitude: marker.longitude})}
              style={styles.buttonMarker}
            >
              <Text style={styles.buttonText}>
                Marcador - {index + 1}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
        
      <ModalComponent
        modalVisible=     {modalVisible}
        setModalVisible=  {setModalVisible}
        marker=           {marker}
        setChange=        {setChange}
      />
    </>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer:{
    position:       'absolute',
    height:         150
  },
  buttonMarker: {
    width:            100,
    height:           30,
    backgroundColor:  '#2196F3',
    borderRadius:     3,
    justifyContent:   'center',
    alignItems:       'center',
    marginVertical:   2
  },
  buttonText:{
    color:      'white',
    fontWeight: 'bold'
  }
})
