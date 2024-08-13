import React                          from 'react';
import { Auth0Provider}               from 'react-native-auth0';
import { LoginScreen }                from './src/screens/LoginScreen/LoginScreen';
import { AUTH0_APIKEY, AUTH0_DOMAIN } from '@env';



const App = () => {
  return (
    <Auth0Provider
      domain=   {AUTH0_DOMAIN}
      clientId= {AUTH0_APIKEY}
    >
      <LoginScreen/>
    </Auth0Provider>
  );
};

export default App;
