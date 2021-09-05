import * as React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

export default function FlatButton({text, onPress, bg}) {
  return(
    <TouchableOpacity style={styles.contain} onPress={onPress}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contain: {
    width: "100%",
    alignItems: 'center',
  },
  btn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: "#0069FA",
    width: "60%",
    margin: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
    textAlign: "center",
  }
})