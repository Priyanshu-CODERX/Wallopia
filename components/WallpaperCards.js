import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system';
import CameraRoll from '@react-native-community/cameraroll';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export default function WallpaperCards({ wallpaperURL, authorName }) {
  const [modalVisible, setModalVisible] = useState(false);

  const hasPermissions = async () => {
    const permissions = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permissions)
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permissions);
    return status === 'granted';
  }

  const saveImage = async () => {
    if (Platform.OS === 'android' && !(await hasPermissions())) {
      return;
    }
    FileSystem.downloadAsync(wallpaperURL, FileSystem.documentDirectory + "image" + ".jpg").then(({ uri }) => {
      console.log(uri)
      console.log(wallpaperURL)
      CameraRoll.save(wallpaperURL);
      alert("Photo Saved!")
    })
    // CameraRoll.saveToCameraRoll()
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{
                width: ScreenWidth - 8,
                height: ScreenHeight - 90,
                borderRadius: 10,
                resizeMode: 'cover'
              }}
              source={{ uri: wallpaperURL }}
            />
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[
                  styles.button,
                  {
                    backgroundColor: '#E0E0E0',
                    borderColor: '#212121',
                    margin: 10,
                  },
                ]}>
                <Icon name={'close'} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveImage}
                style={[
                  styles.button,
                  {
                    backgroundColor: '#E0E0E0',
                    borderColor: '#212121',
                    margin: 10,
                  },
                ]}>
                <Icon name={'download'} size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}>
        <Image style={styles.img} source={{ uri: wallpaperURL }} />
        <Text style={styles.paragraph}>Author: {authorName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '100%',
    height: ScreenHeight,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
