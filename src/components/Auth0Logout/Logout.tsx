import { Pressable, Text }  from "react-native";
import { useAuth0 }         from "react-native-auth0";

interface Props {
  show: boolean;
  closeSession: () => void;
}

export const LogoutButton = ({show, closeSession}: Props) => {
  
  const {clearSession} = useAuth0();
  
  const onPress = async () => {
    try {
      await clearSession();
      await closeSession()
    } catch (e) {
      console.log(e);
    }
  };
  
  if(!show) return null
  
  return (
    <Pressable
      style={{
        borderRadius: 50,
        backgroundColor: '#2196F3',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 5,
        left: 5,
        justifyContent: 'center',
        alignItems: 'center',

      }}
      onPress={onPress}
    >
      <Text 
        style={{
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        Salir
      </Text>
    </Pressable>
  ) 
};