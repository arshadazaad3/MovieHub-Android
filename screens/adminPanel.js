import React from 'react'
import { Modal, StyleSheet, Text, View, Image, Button, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';

import * as firebaseConfig from '../components/Fire'
import firebase from 'firebase'
import '@firebase/storage';
import Admin from './adminPanel/admin'
import { Snackbar } from 'react-native-paper';

export default class adminPanel extends React.Component {

    state = {
        username: "",
        password: "",
        system_username: '',
        system_password: '',
        loading: true,
        incorrectPassword: '',
        loginModal: false
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig.firebaseConfig)
        }
        const rootRef = firebase.database().ref();
        const post = rootRef.child('ADMIN').orderByKey();
        post.on('value', snap => {
            snap.forEach(child => {
                this.setState({
                    system_username: child.val().username,
                    system_password: child.val().password,
                    loading: false,
                })
            })
        })

    }

    handleSubmit() {
        if (this.state.username == this.state.system_username && this.state.password == this.state.system_password) {
            console.log("Successfully Signed In")
            console.log("Welcome Root")
            this.setState({ username: "", password: "", loginModal: true })
        }
        else {
            console.log("Incorrect Password of Username")
            this.setState({ username: "", password: "" })
            this.setState({ incorrectPassword: "Incorrect Username or Password" })
        }
    }

    toggleAdminPage() {
        this.setState({ loginModal: !this.state.loginModal })
    }

    render() {
        const { navigation } = this.props;
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={'#24A6D9'} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Modal
                    odal
                    animationType="fade"
                    visible={this.state.loginModal}
                    onRequestClose={() => this.toggleAdminPage()}
                >
                    <Admin></Admin>
                </Modal>
                

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
                        value={this.state.username}
                        onChangeText={text => this.setState({ username: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        value={this.state.password}
                        placeholder="Password..."
                        placeholderTextColor="#fff"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity>
                    <Text style={styles.incorrect}>{this.state.incorrectPassword}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} onPress={() => {
                    this.handleSubmit()
                }}>

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
        padding: 20,
        elevation: 20


    },
    inputText: {
        height: 50,
        color: "white",
    },
    incorrect: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#02ad94",
        borderRadius: 25,
        elevation: 20,

        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});