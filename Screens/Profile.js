import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { auth, db } from '../firebase/firebase';
import FlatButton from '../components/FlatButton';

export default function Profile({ navigation }) {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/user.png')} />

      <Text style={styles.paragraph}>{auth().currentUser.displayName}</Text>
      <FlatButton text="Sign Out" onPress={signOut} />
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
    margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});
