import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { auth, db } from '../firebase/firebase';

import FlatButton from '../components/FlatButton';

export default function Uploader({ navigation }) {
  const [uid, setUid] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [url, setUrl] = useState('');

  let dbRef = db.collection('wallpapers');
  const addWallpapers = () => {
    if(authorName === "" && url === "") {
      alert("Please enter the data");
    }
    else {
      dbRef.add({
          author: authorName,
          url: url
      })
    }
    setUrl("");
    setAuthorName("")
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Author Name"
        onChangeText={(text) => {
          setAuthorName(text);
        }}
      />
      <TextInput
        style={styles.inputField}
        placeholder="URL"
        onChangeText={(text) => {
          setUrl(text);
        }}
      />
      <FlatButton text="Upload" onPress={addWallpapers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    margin: 10,
    color: '#212121',
  },
  headerTitle: {
    color: '#212121',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  fieldsContainer: {
    backgroundColor: '#fff',
    height: 420,
    // borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    paddingTop: 20,
    elevation: 3,
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
  },
  createAccText: {
    fontSize: 40,
    margin: 10,
    width: '90%',
    marginBottom: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});
