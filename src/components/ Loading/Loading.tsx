import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

interface Props {
  isLoading: boolean
}

export const Loading = ({isLoading}: Props) => {

  if(!isLoading) return null

  return (
    <View style={styles.overlay}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position:         'absolute',
    top:              0,
    left:             0,
    right:            0,
    bottom:           0,
    backgroundColor:  'rgba(0, 0, 0, 0.5)',
    justifyContent:   'center',
    alignItems:       'center',
    zIndex:           100,
  },
  loadingContainer: {
    padding:          20,
    borderRadius:     10,
    justifyContent:   'center',
    alignItems:       'center',
  },
});
