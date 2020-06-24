import React from 'react'
import { View } from 'react-native';

export default class addMovie extends React.Component {
    state = {
        movies: [],
        movieObject: {
            image: '',
            link: '',
            desc: '',
            title: '',
            stat: '',
            key: ''
        }
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig.firebaseConfig)
        }
        this.readMovies()
        let userRef = this.database.ref('Youtube_trend/' + userId);

    }

    //Read movies from Firebase
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
        })
    }

    testM() {
        this.saveMovie("https://firebasestorage.googleapis.com/v0/b/moviehub-31aab.appspot.com/o/endgame.jpg?alt=media&token=f5cbd582-eb8b-40e3-8f6c-5321ec80b481"
            , "Engame123", "2hr", "none thanos", "www.12", "3")


    }

    //Save Movie To Firebase
    saveMovie = (image, title, stat, desc, link, key) => {
        this.readMovies();
        var CHECK_MOVIE_AVAILABLE = this.state.movies.find(function (item, index) {
            if (item.key == key) {
                console.log("Movie with Same Key already Present");
                return true
            } else {
                return false
            }
        });
        if (!CHECK_MOVIE_AVAILABLE) {
            firebase.database().ref('Movies/').push({
                image,
                title,
                stat,
                desc,
                link,
                key
            }).then((data) => {
                console.log('data ', data)
            }).catch((error) => {
                console.log('error ', error)
            })
        }

    }
    render() {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}