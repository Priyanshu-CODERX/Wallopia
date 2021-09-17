import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Constants from 'expo-constants';

import FlatButton from '../components/FlatButton';
import { auth } from '../firebase/firebase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = () => {
    if (name === '' && email === '' && password === '') {
      alert('Please enter the credentials to signup');
    } else {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: name,
          });
          navigation.replace('Home');
        })
        .catch((error) => alert(error.message));
    }
  };

  const registerToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.createAccText}>
        Welcome to Wallopia. Start using our app by creating an account for
        free.
      </Text>
      <View style={styles.fieldsContainer}>
        <Text style={styles.headerTitle}>Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Name"
          onChangeText={(text) => {
            setName(text);
          }}
        />
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
          <FlatButton text="Register" onPress={registerUser} />
          <Text style={styles.loginText}>
            Already a user?{' '}
            <Text style={{ color: '#0069FA' }} onPress={registerToLogin}>
              Login
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
