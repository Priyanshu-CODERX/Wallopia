import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import Constants from 'expo-constants';

import FlatButton from '../components/FlatButton';
import { auth } from '../firebase/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = () => {
    if (email === '' && password === '') {
      alert('Please enter the credentials to signup');
    } else {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((authUser) => {
          navigation.replace('Home');
        })
        .catch((error) => alert(error.message));
    }
  };

  const loginToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.createAccText}>
        Welcome Back! Login to start using Wallopia
      </Text>
      <View style={styles.fieldsContainer}>
        <Text style={styles.headerTitle}>Email</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text style={styles.headerTitle}>Password</Text>
        <TextInput
          style={styles.inputField}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />

        <View style={styles.btnContainer}>
          <FlatButton text="Login" onPress={loginUser} />
          <Text style={styles.loginText}>
            New to Wallopia?{' '}
            <Text style={{ color: '#0069FA' }} onPress={loginToRegister}>
              Register
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#0069FA',
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
    height: 350,
    borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
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
