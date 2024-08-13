import React      from 'react';
import {Image, Text, TouchableOpacity, View}   from 'react-native';
import {useAuth0} from 'react-native-auth0';

interface Props {
  show: boolean;
}

export const LoginButton = ({show}: Props) => {

  const {authorize} = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };
  console.log({show});

  if(show) return null

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../../assets/image/logo2.png')}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{borderRadius: 5, backgroundColor: '#2196F3', padding: 5, width: 100, height: 40, justifyContent:'center', alignItems: 'center'}}
        
      >
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  )
};
