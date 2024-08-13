import React      from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View}   from 'react-native';
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

  if(show) return null

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/image/logo2.png')}
      />
      <TouchableOpacity
        onPress={onPress}
        style=  {styles.loginButton}
        
      >
        <Text style={styles.loginText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
   flex:            1,
   justifyContent:  'center',
   alignItems:      'center'
  },
  loginButton: {
    borderRadius:      5,
    backgroundColor:   '#2196F3',
    padding:           5,
    width:             100,
    height:            40,
    justifyContent:    'center',
    alignItems:        'center'
  },
  loginText: {
    color:        'white',
    fontWeight:   'bold',
    fontSize:     20
  }
});
