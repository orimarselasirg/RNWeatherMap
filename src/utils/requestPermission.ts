import { Platform } from 'react-native'
import {
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request
} from 'react-native-permissions'
import { PermissionsStatusType } from '../interface/PermissionStatus'

export const requestPermissionLocation = async():Promise<PermissionsStatusType> => {

  let status: PermissionStatus = 'unavailable'

  if(Platform.OS !== 'android' && Platform.OS !== 'ios') throw new Error('Plataforma no soportada')
  
  if(Platform.OS === 'ios')     status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  
  if(Platform.OS === 'android') status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

  
  if(status === 'blocked') await openSettings()
  
  return status
}