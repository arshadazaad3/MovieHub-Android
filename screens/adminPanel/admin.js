import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Button, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import * as firebaseConfig from '../../components/Fire'
import firebase from 'firebase'
import renderIf from './renderIf'

export default class addMovie extends React.Component {
    state = {
        movieNames: [],
        links: [],
        keys: [],
        loading: false,
        readData: false,
        movieDataget: false,
        title: '',
        imageurl: '',
        key: '',
        link: '',
        stat: '',
        desc: ''
    }

    componentDidMount() {
        this.setState({ loading: true })
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig.firebaseConfig)
        }
        const rootRef = firebase.database().ref();
        const post = rootRef.child('Movies/').orderByKey();
        post.on('value', snap => {
            snap.forEach(child => {
                if (!this.state.movieNames.includes(child.val().title)) {
                    this.state.movieNames.push(child.val().title)
                }
                if (!this.state.links.includes(child.val().link)) {

                    this.state.links.push(child.val().link)
                }
                if (!this.state.keys.includes(child.val().key)) {

                    this.state.keys.push(child.val().key)
                }
            })
            this.setState({ loading: false })
        })
    }

    saveMovieinputs() {
        this.saveMovie(this.state.imageurl, this.state.title, this.state.stat, this.state.desc, this.state.link, this.state.key)
    }

    //Save Movie To Firebase
    saveMovie = (image, title, stat, desc, link, key) => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig.firebaseConfig)
        }
        if (this.state.keys.includes(key)) {
            alert("movie already exists with same key")
        }

        if (image == '' || title == '' || stat == '' || desc == '' || link == '' || key == '') {
            alert("Any Filed cannot be empty")
        }
        else {
            firebase.database().ref('Movies/').push({
                image,
                title,
                stat,
                desc,
                link,
                key
            }).catch((error) => {
                console.log('error ', error)
            })
        }
        this.setState({
            title: '',
            stat: '',
            link: '',
            key: '',
            imageurl: '',
            desc: ''
        })
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={'#24A6D9'} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView style={styles.movieNames}>
                    {this.state.movieNames.map((result, index) => {
                        return (
                            <View key={`result-${index}`} style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={{ color: '#FFF', borderRadius: 12, backgroundColor: '#2cb978', borderWidth: 1, padding: 6, marginBottom: 10 }}>
                                    {result}
                                </Text>
                            </View>
                        )
                    })
                    }
                </ScrollView>
                <View style={{ height: 150, marginTop: 10 }}>
                    <ScrollView style={styles.links}>
                        {this.state.keys.map((result, index) => {
                            return (
                                <View key={`result-${index}`} style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{ color: '#FFF', borderRadius: 12, borderColor: '#107a8b', borderWidth: 1, padding: 6, marginBottom: 10, marginLeft: 10, paddingLeft: 10 }}>
                                        {result}
                                    </Text>
                                </View>
                            )
                        })
                        }
                    </ScrollView>
                </View>
                <KeyboardAvoidingView>

                    <View style={{ height: 300, flexDirection: "column", marginLeft: 10, marginTop: 10 }}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Movie Name..."
                            placeholderTextColor="#fff"
                            value={this.state.title}
                            onChangeText={text => this.setState({ title: text })}
                        />
                        <TextInput
                            style={styles.inputText}
                            placeholder="Description Here..."
                            placeholderTextColor="#fff"
                            value={this.state.desc}
                            onChangeText={text => this.setState({ desc: text })}
                        />
                        <TextInput
                            style={styles.inputText}
                            placeholder="Link ..."
                            placeholderTextColor="#fff"
                            value={this.state.link}
                            onChangeText={text => this.setState({ link: text })}
                        />
                        <TextInput
                            style={styles.inputText}
                            placeholder="Key Name..."
                            placeholderTextColor="#fff"
                            value={this.state.key}
                            onChangeText={text => this.setState({ key: text })}
                        />
                        <TextInput
                            style={styles.inputText}
                            placeholder="Image URL..."
                            placeholderTextColor="#fff"
                            value={this.state.imageurl}
                            onChangeText={text => this.setState({ imageurl: text })}
                        />
                        <TextInput
                            style={styles.inputText}
                            placeholder="Stats ..."
                            placeholderTextColor="#fff"
                            value={this.state.stat}
                            onChangeText={text => this.setState({ stat: text })}
                        />
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }} onPress={() => this.saveMovieinputs()}>
                            <Text style={{ color: 'white', borderWidth: 1, borderRadius: 22, borderColor: '#107a8b', padding: 15 }}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>


            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',

    },
    inputText: {
        marginBottom: 10,
        height: 30,
        color: "#000",
        backgroundColor: "#226089",
        borderRadius: 15,
        textAlign: 'center'
    },

    movieNames: {
    },

    links: {
        paddingTop: 10
    }

});
