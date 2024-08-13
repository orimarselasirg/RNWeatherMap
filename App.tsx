import React            from 'react';
import { Auth0Provider} from 'react-native-auth0';
import { LoginScreen }  from './src/screens/LoginScreen/LoginScreen';

const App = () => {
  return (
    <Auth0Provider
      domain=   {'dev-mz28f1dv.us.auth0.com'}
      clientId= {'U7GI9aRHvUYX50Q8yhpRReTD8itVSOa5'}
    >
      <LoginScreen/>
    </Auth0Provider>
  );
};

export default App;
