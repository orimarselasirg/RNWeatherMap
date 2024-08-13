import React, { useEffect, useState } from 'react'
import { useAuth0 } from 'react-native-auth0';
import { Location } from '../../interface/Location';
import { closeSession, deleteTable, getUserSessionData, insertIntoSessionTable, markerTables, sessionTable } from '../../utils/sqlLite';
import { requestPermissionLocation } from '../../utils/requestPermission';
import { getLocation } from '../../utils/getLocation';
import { User } from '../../service/entities/login.entities';
import { Session } from '../../interface/Session';

export const useLogin = () => {

  const {user} = useAuth0();
  const [session, setSession] = useState<Session>({
    username:   '',
    date:       '',
    is_active:  0
  });
  const [location, setLocation] = useState<Location>({
    latitude: 37,
    longitude: -122,
  })

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

  // useEffect(()=>{
  //     deleteTable('sessionTable')
  //   },[])

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
      username: user.givenName,
      date: new Date().toDateString(),
      active: 1
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
