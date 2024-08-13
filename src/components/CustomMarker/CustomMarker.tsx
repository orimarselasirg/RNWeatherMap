import React            from 'react'
import { Image, View }  from 'react-native';

interface Props {
  icon: string;
}

export const CustomMarker = ({icon}: Props) => {
  return (
    <View style={{
      backgroundColor: 'lightblue',
      padding:          5,
      borderRadius:     50,
    }}>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />
    </View>
  );
};