import React from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator,
    Dimensions, StatusBar, ImageBackground, TextInput, FlatList, Linking
} from 'react-native';

import Carousel from 'react-native-anchor-carousel'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import tempData from '../components/tempData'
import * as firebaseConfig from '../components/Fire'
import firebase from 'firebase'
import { Snackbar } from 'react-native-paper';


const { width, height } = Dimensions.get('window');

export default class Home extends React.Component {

    state = {
        movies: [],
        gallery: tempData,
        loading: true,
        background: {
            uri: 'https://firebasestorage.googleapis.com/v0/b/moviehub-31aab.appspot.com/o/endgame.jpg?alt=media&token=f5cbd582-eb8b-40e3-8f6c-5321ec80b481',
            name: '',
            stat: '',
            desc: '',
            link: ''
        },

        favorites: [],

        movieObject: {
            image: '',
            link: '',
            desc: '',
            title: '',
            stat: '',
            key: ''
        },

        youtube_Object: {
            image: 'https://firebasestorage.googleapis.com/v0/b/moviehub-31aab.appspot.com/o/endgame.jpg?alt=media&token=f5cbd582-eb8b-40e3-8f6c-5321ec80b481',
            name: '',
            link: ''

        },

        snackbarVisible: false,
        snackbarlabel: ''
    }

    defaultMovie() {
        this.setState({
            background: {
                uri: this.state.movies[0].image,
                name: this.state.movies[0].title,
                stat: this.state.movies[0].stat,
                desc: this.state.movies[0].desc,
                link: this.state.movies[0].link
            }
        })
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig.firebaseConfig)
        }
        this.readMovies()
        this.readYoutubeData()



    }


    componentWillUnmount() {
        window.clearInterval(this.loading)
    }



    readYoutubeData = () => {
        const rootRef = firebase.database().ref();
        const post = rootRef.child('Youtube_trend').orderByKey();
        post.on('value', snap => {
            snap.forEach(child => {
                this.setState({
                    youtube_Object: {
                        image: child.val().imageid,
                        link: child.val().link,
                        name: child.val().name,
                    }
                })
            })
        })
    }


    readMovies = () => {
        const rootRef = firebase.database().ref();
        const post = rootRef.child('Movies').orderByKey();
        post.on('value', snap => {
            snap.forEach(child => {
                this.setState({
                    movieObject: {
                        image: child.val().image,
                        link: child.val().link,
                        desc: child.val().desc,
                        title: child.val().title,
                        stat: child.val().stat,
                        key: child.val().key
                    }
                })
                if (!this.state.movies.includes(this.state.movieObject)) {
                    this.state.movies.push(this.state.movieObject)
                }
            })
            this.setState({ loading: false })
            this.defaultMovie();
        })
    }

    onScrollEndHanler = (item) => {
        this.setState({
            background: {
                uri: item.image,
                name: item.title,
                stat: item.stat,
                desc: item.desc,
                link: item.link
            }
        })
    }

    downloadMovie = (link) => {
        Linking.openURL(link)
        console.log(link)
    }

    renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this._carousel.scrollToIndex(index);
                        this.setState({
                            background: {
                                uri: item.image,
                                name: item.title,
                                stat: item.stat,
                                desc: item.desc,
                                link: item.link
                            }
                        })
                    }}
                >
                    <Image source={{ uri: item.image }} style={styles.carouselImage} />
                    <Text style={styles.carouselText}>{item.title}</Text>
                    <TouchableOpacity style={styles.carouselIcon}
                        //Add Movie To Favorites
                        onPress={() => {
                            if (this.state.favorites.includes(item)) {
                                console.log('movie exists in favorites')
                                this.setState({
                                    snackbarlabel: 'Movie Already Added to favorites',
                                    snackbarVisible: true
                                })
                            }
                            else {
                                this.state.favorites.push(item)
                                this.setState({
                                    snackbarlabel: 'Added to favorites',
                                    snackbarVisible: true
                                })
                                console.log("Successfully added movie to favorites")
                            }
                        }}>
                        <MaterialIcons name='library-add' size={30} color='white' />

                    </TouchableOpacity>

                </TouchableOpacity>

            </View>
        )
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={'#24A6D9'} />
                </View>
            )
        }

        if (this.state.movies.length < 1) {
            console.log("Hello")
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={'#24A6D9'} />
                </View>
            )
        }

        return (

            <ScrollView style={{ backgroundColor: "#000" }}>

                <StatusBar hidden />


                <View style={styles.carouselContentContainer}>

                    <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000' }}>

                        <ImageBackground
                            source={{ uri: this.state.background.uri }}
                            style={styles.imageBG}
                            blurRadius={7}
                        >

                            <Text style={{
                                fontSize: 24,
                                color: 'white',
                                fontWeight: 'bold',
                                marginLeft: 10,
                                marginVertical: 10
                            }}>
                                Top picks this week
                        </Text>

                            <View style={styles.carouselContainerView}>
                                <Carousel
                                    style={styles.Carousel}
                                    data={this.state.movies}
                                    renderItem={this.renderItem}
                                    itemWidth={200}
                                    containeriwdth={width - 20}
                                    seperatorWidth={0}
                                    ref={(c) => {
                                        this._carousel = c;
                                    }}
                                    inActiveOpacity={0.4}
                                    onScrollEnd={(item) => this.onScrollEndHanler(item)}

                                />


                            </View>

                            <View style={styles.movieInfoContainer}>
                                <View style={{ justifyContent: "center", maxWidth: '80%' }}>
                                    <Text style={styles.movieName}>{this.state.background.name}</Text>
                                    <Text style={styles.movieStat}>{this.state.background.stat}</Text>


                                </View>


                                <TouchableOpacity
                                    style={styles.downloadIconContainer}
                                    onPress={() => this.downloadMovie(this.state.background.link)}
                                >
                                    <MaterialIcons name='cloud-download' size={22} color="#02ad94" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ paddingHorizontal: 14, marginTop: 14 }}>
                                <Text style={{ color: "white", opacity: 0.8, lineHeight: 20 }}>{this.state.background.desc}</Text>
                                <Snackbar
                                    visible={this.state.snackbarVisible}
                                    // visible={true}
                                    onDismiss={() => this.setState({ snackbarVisible: false })}
                                    action={{
                                        label: this.state.snackbarlabel,
                                        onPress: () => {
                                            this.setState({ snackbarVisible: false })
                                        },
                                        alignItems: 'left'
                                    }}
                                    duration={10000}
                                    style={{ backgroundColor: "#3d5af1", width: '100%', height: 30, top: 50 }}
                                />
                            </View>

                        </ImageBackground>
                    </View>
                </View>



                <View style={{ marginHorizontal: 14 }}>
                    <View style={styles.trendingContainer}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 24, marginTop: 20 }}>
                            Trending
        </Text>
                        <MaterialIcons name='trending-up' size={27} color="#02ad94" style={{ top: 22, left: 10 }} />
                    </View>

                    <ImageBackground
                        source={{ uri: this.state.youtube_Object.image }}
                        style={{ height: 250, width: '100%', backgroundColor: '#000', marginBottom: 10 }}
                    >
                        {/* <Text style={{ color: 'white', padding: 8 }}>{youTubeVideo.name}</Text> */}
                        <TouchableOpacity style={{ ...styles.downloadIconContainer, position: 'absolute', top: '40%', right: '40%' }}>
                            <MaterialIcons name='play-arrow' size={22} color="#02ad94" />
                        </TouchableOpacity>
                    </ImageBackground>
                    <View style={styles.trendingContainer}>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>
                            Favorites
                    </Text>
                        <MaterialIcons name='favorite' size={27} color="#02ad94" style={{ top: 14, left: 10 }} />
                    </View>

                    <FlatList
                        style={{ marginBottom: 30, marginTop: 15 }}
                        data={this.state.favorites}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={{ marginRight: 20 }}
                                    onLongPress={() => {
                                        this.state.favorites.pop(item)
                                    }}>
                                    <Image source={{ uri: item.image }} style={{ height: 300, width: 200 }} />
                                    <View style={{ position: "absolute", height: 5, width: '100%', backgroundColor: '#02ad94' }}></View>
                                    <FontAwesome5 name="play" size={38} color="#fff" style={{ position: "absolute", top: '45%', left: '45%', opacity: 0.8 }} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    carouselContentContainer: {
        flex: 1,
        backgroundColor: '#000',
        height: 680,
        paddingHorizontal: 14,
    },

    imageBG: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: "flex-start",
    },

    searchBoxContainer: {
        backgroundColor: '#FFF',
        elevation: 10,
        borderRadius: 4,
        marginVertical: 10,
        width: '95%',
        flexDirection: "row",
        alignSelf: 'center'
    },
    searchBox: {
        padding: 12,
        paddingLeft: 20,
        fontSize: 16
    },

    searchBoxIcon: {
        position: 'absolute',
        right: 20,
        top: 14
    },
    trendingContainer: {
        // alignSelf: "center",
        flexDirection: 'row',
        // height: 40,
        paddingTop: 3,
        // backgroundColor: 'green',
    },

    carouselContainerView: {
        width: '100%',
        height: 350,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 3

    },

    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)'
    },

    carouselText: {
        padding: 14,
        color: 'white',
        position: "absolute",
        bottom: 10,
        left: 2,
        fontWeight: 'bold'
    },

    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    },

    movieInfoContainer: {
        flexDirection: "row",
        marginTop: 1,
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 14

    },
    movieName: {
        padding: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 1
    },
    movieStat: {
        paddingLeft: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 0.8
    },

    downloadIconContainer: {
        marginTop: 15,
        backgroundColor: '#212121',
        padding: 10,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        height: 47,
        borderWidth: 2,
        borderColor: "rgba(2,173,148,0.2)",
        marginBottom: 14,

    }
});

