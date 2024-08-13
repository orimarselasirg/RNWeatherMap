import { useEffect, useState }        from 'react'
import { useAuth0 }                   from 'react-native-auth0';
import { getLocation }                from '../../utils/getLocation';
import { Location }                   from '../../interface/Location';
import { requestPermissionLocation }  from '../../utils/requestPermission';
import { Session }                    from '../../interface/Session';
import { User }                       from '../../service/entities/login.entities';
import {
  closeSession,
  getUserSessionData,
  insertIntoSessionTable,
  markerTables,
  sessionTable,
  deleteTable,
} from '../../utils/sqlLite';

export const useLogin = () => {

  const {user} = useAuth0();
  const [session, setSession] = useState<Session>({
    username:   '',
    date:       '',
    is_active:  0
  });
  const [location, setLocation] = useState<Location>({
    latitude:   37,
    longitude: -122,
  })
  
  // useEffect(()=>{
  //     deleteTable('sessionTable')
  //   },[])
  
  useEffect(()=>{
    sessionTable('sessionTable')
  },[])
  
  useEffect(()=>{
    markerTables('markers')
  },[])
  
  useEffect(()=>{
    getPermission()
  },[])

  useEffect(()=>{
    if(!user) {
      saveSessions(user as never)
    }
  },[user])

  useEffect(()=> {
    getSessions()
  },[])

  useEffect(()=>{
    getLocationFunction()
  },[])


  const getSessions = async () => {
    try {
      const session = await getUserSessionData('sessionTable')
      setSession(session as never)
    } catch (error) {
      console.log({error});
    }
  }
    
  const getPermission = async () => {
    await requestPermissionLocation()
  }


  const getLocationFunction = async () => {
    setLocation(await getLocation())
  }

  const saveSessions = async (user: User) => {
    const values = {
      username: user?.givenName ?? 'username',
      date:     new Date().toDateString(),
      active:   1
    }
    try {
      await insertIntoSessionTable('sessionTable', values )
    } catch (error) {
      console.log({error});
    }
  }

  const closeSessionData = async () => {
    try {
      if(session.id) {
        await closeSession(session.id)
      }
    } catch (error) {
      console.log({error});
    }
  }

  return {
    user,
    location,
    session,
    closeSessionData
  }
}
