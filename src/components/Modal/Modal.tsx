import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image
} from 'react-native';
import { Markers } from '../../interface/Markers';
import { deleteMarker, insertIntoTable } from '../../utils/sqlLite';

interface Props {
  modalVisible                    :boolean;
  setModalVisible(value: boolean) :void;
  marker                          :Markers,
  setChange(value: boolean)       :void
}

export const ModalComponent = ({
  marker,
  modalVisible=false,
  setChange,
  setModalVisible,
}: Props) => {


  const deleteMarkerFunction = async(id: number, tableName: string) => {
    try {
      const isDelete = await deleteMarker(id, tableName)
      if(isDelete){
        setChange(true)
        setModalVisible(!modalVisible);
      }
    } catch (error) {
      console.log({error});
    }
  }

  const saveMarkerToDatabase = async(tableName: string, marker: Markers) => {
    try {
      await insertIntoTable(tableName, marker)
      setChange(true)
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log({error});
    }
  }

  return (
      <Modal
        animationType=  "slide"
        transparent=    {true}
        visible=        {modalVisible}
        onRequestClose= {() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.cornerButton}
              onPress={()=>setModalVisible(!modalVisible)}
            >
              <Text style={{fontSize: 15, color: 'white'}}>
                X
              </Text>
            </Pressable>
            <Text style={styles.modalText}>{marker?.name}</Text>
            <Image
              source={{uri: `https://openweathermap.org/img/wn/${marker?.icon}@4x.png`}}
              width={30}
            />
            <View style={{width: 200}}>
              <View style={styles.rowInfo}>
                <Text style={{width: 100, fontWeight: 'bold'}}>Temperatura:</Text>
                <Text>{marker?.tempereture.toFixed(2)}</Text>
              </View>
              <View style={styles.rowInfo}>
                <Text style={{width: 100, fontWeight: 'bold'}}>Latitud:</Text>
                <Text>{marker.latitude.toFixed(2)}</Text>
              </View>
              <View style={styles.rowInfo}>
                <Text style={{width: 100, fontWeight: 'bold'}}>Longitud:</Text>
                <Text>{marker.longitude.toFixed(2)}</Text>
              </View>
              <View style={styles.rowInfo}>
                <Text style={{width: 100, fontWeight: 'bold'}}>Descripción:</Text>
                <Text>{marker?.descrption}</Text>
                
              </View>
            </View>
            <View style={styles.buttonSection}>
              {
                !marker.id &&
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => saveMarkerToDatabase('markers', marker)}>
                  <Text style={styles.textStyle}>Guardar</Text>
                </Pressable>
              }
              {
                marker.id &&
                <Pressable
                  style={[styles.button, styles.buttonDanger]}
                  onPress={() => deleteMarkerFunction(marker.id!, 'markers')}>
                  <Text style={styles.textStyle}>Borrar</Text>
                </Pressable>
              }
            </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex            :1,
    justifyContent  :'center',
    alignItems      :'center',
    marginTop       :22,
  },
  modalView: {
    margin          :20,
    backgroundColor :'white',
    borderRadius    :20,
    padding         :35,
    alignItems      :'center',
    shadowColor     :'#000',
    shadowOffset: {
      width   :0,
      height  :2,
    },
    shadowOpacity   :0.25,
    shadowRadius    :4,
    elevation       :5,
  },
  button: {
    borderRadius    :20,
    padding         :10,
    elevation       :2,
    width           :80
  },
  buttonOpen: {
    backgroundColor :'#F194FF',
  },
  buttonClose: {
    backgroundColor :'#2196F3',
  },
  buttonDanger: {
    backgroundColor :'#ff7b5a',
  },
  textStyle: {
    color           :'white',
    fontWeight      :'bold',
    textAlign       :'center',
  },
  modalText: {
    fontSize        :25,
    fontWeight      :'bold',
    marginBottom    :15,
    textAlign       :'center',
  },
  buttonSection: {
    flexDirection   :'row',
    justifyContent  :'space-around',
    marginTop       :20,
    width           :200,
  },
  cornerButton: {
    alignItems      :'center',
    backgroundColor :'#2196F3',
    borderRadius    :50,
    height          :20,
    justifyContent  :'center',
    position        :'absolute',
    right           :20,
    top             :10,
    width           :20,
  },
  rowInfo: {
    flexDirection   :'row',
  }
});