import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'

export default function profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Movie<Text style={styles.appTitle1}>Hub</Text></Text>
      <View style={styles.projectByContainer}>
        <MaterialIcons name='group-work' size={30} color='white' style={{ bottom: 3, paddingRight: 10 }} />
        <Text style={styles.projectBy}>
          A project by team <Text style={styles.appTitle1}>ROOT
              </Text>
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 25,
    marginLeft:10
  },

  appTitle1: {
    fontWeight: 'bold',
    color: '#02ad94'
  },

  projectByContainer: {
    alignSelf: "center",
    flexDirection: 'row',
    height: 40,
    paddingTop: 3,
    // backgroundColor: 'green',
  },

  projectBy: {
    color: '#FFF',
    // backgroundColor: 'blue'
  }


});
