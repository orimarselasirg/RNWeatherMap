import { StyleSheet, View } from 'react-native'
import { LoginButton }      from '../../components/Auth0Login/Login';
import { LogoutButton }     from '../../components/Auth0Logout/Logout';
import { Map }              from '../../components/Map/Map';
import { useLogin }         from './useLogin';


export const LoginScreen = () => {
  const { user, location, closeSessionData } =useLogin()

  return (
    <View style={styles.container}>
      <LoginButton
        show={!!user}
      />  
      <Map
        latitude={location.latitude}
        longitude={location.longitude}
        show={!!user}
      />
          
      <LogoutButton
        show={!!user}
        closeSession={closeSessionData}
      />
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
 });
