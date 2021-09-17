import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import { auth, db } from '../firebase/firebase';
import WallpaperCards from '../components/WallpaperCards';

export default function Home({ navigation }) {
  const [data, setData] = useState([])
  let ref = db.collection('wallpapers');

  let dta = []
  const fetchData = () => {
    ref.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let dt = doc.data();
        const { author, url } = doc.data();
        dta.push({ author, url })
      })
    })
    console.log("________________________________");
    for (let i = 0; i < dta.length; i++) {
      console.log(dta[i])
    }
    console.log("____________________________________")
    // setData(dta)
  };

  // fetchData.bind(params)

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <WallpaperCards wallpaperURL={item.url} authorName={item.author} />
        )}
      />
      <Button onPress={() => setData(dta)} title="Fetch Data" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
    backgroundColor: "#292929",
    // padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});
