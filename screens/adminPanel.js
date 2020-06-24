import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'
import * as firebaseConfig from '../components/Fire'
import firebase from 'firebase'
import '@firebase/storage';

export default class adm extends React.Component {

    state = {
        email: "",
        password: ""
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Admin<Text style={styles.appTitle1}> Panel</Text></Text>
                <View style={styles.titleContainer}>
                </View>
                <View style={styles.AdminPanelTextContainer}>
                    {/* <MaterialIcons name='https' size={39} color="#02ad94" style={{ top: 14, left: 10 }} /> */}
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username..."
                        placeholderTextColor="#fff"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#fff"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTitle: {
        color: '#FFF',
        // textAlign: 'center',
        fontSize: 25,
    },

    appTitle1: {
        fontWeight: 'bold',
        color: '#02ad94'
    },

    titleContainer: {
        marginTop: 5,
        // backgroundColor: 'red',
        marginLeft: 6

    },
    AdminPanelTextContainer: {
        // alignSelf: "center",
        flexDirection: 'row',
        // height: 40,
        paddingTop: 3,
        paddingBottom: 5,
        // backgroundColor: 'green',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 40,
        color: '#FFF'
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#02ad94",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});