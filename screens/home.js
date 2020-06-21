import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
  Dimensions, StatusBar, ImageBackground, TextInput, FlatList
} from 'react-native';

import Carousel from 'react-native-anchor-carousel'
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons'


const App = () => {


  const [background, setBackground] = useState({
    uri: require('../components/images/moviePosters/endgame.jpg'),
    name: 'Avengers: End Game',
    stat: '2019 . Action/Sci-fi . 3h 2m',
    desc: 'After Thanos, wipes the entire Universe'
  })

  const [list, setList] = useState([
    { image: require('../components/images/moviePosters/dumbo.jpg'), key: '1' },
    { image: require('../components/images/moviePosters/spiderman.jpg'), key: '2' }
  ])


  const [gallery, setgallery] = useState([
    {
      image: require('../components/images/moviePosters/godzilla.jpg'),
      title: 'Gozilla : King of Monsters',
      released: '2019 ',
      desc: 'After Thanos, wipes the entire Universe',
      key: '1'
    },

    {
      image: require('../components/images/moviePosters/johnwick.jpg'),
      title: 'John Wick Chapter 3 - Parabellum',
      released: '2019 ',
      desc: 'After Thanos, wipes the entire Universe',
      key: '1'
    },

    {
      image: require('../components/images/moviePosters/hobbs.jpg'),
      title: 'Hobbs & Shaw',
      released: '2019 ',
      desc: 'After Thanos, wipes the entire Universe',
      key: '1'
    }
  ]);

  const carouselRef = useRef(null)
  const { width, height } = Dimensions.get('window');

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            carouselRef.current.scrollToIndex(index);
            setBackground({
              uri: item.image,
              name: item.title,
              stat: item.released,
              desc: item.desc
            })
          }}
        >
          <Image source={item.image} style={styles.carouselImage} />
          <Text style={styles.carouselText}>{item.title}</Text>
          <MaterialIcons name='library-add' size={30} color='white' style={styles.carouselIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <StatusBar hidden />
      <View style={styles.carouselContentContainer}>
        <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000' }}>
          <ImageBackground
            source={background.uri}
            style={styles.imageBG}
            blurRadius={7}
          >
            <View style={styles.searchBoxContainer}>
              <TextInput
                placeholder="Seach for Movies"
                placeholderTextColor="#666"
                style={styles.searchBox}
              />
              <Feather name='search' size={22} color='#666' style={styles.searchBoxIcon} />
            </View>

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
                data={gallery}
                renderItem={renderItem}
                itemWidth={200}
                containeriwdth={width - 20}
                seperatorWidth={0}
                ref={carouselRef}
                inActiveOpacity={0.4}
              />
            </View>

            <View style={styles.movieInfoContainer}>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.movieName}>{background.name}</Text>
                <Text style={styles.movieStat}>{background.stat}</Text>
              </View>
              <TouchableOpacity style={styles.playIconContainer}>
                <FontAwesome5 name='play' size={22} color="#02ad94" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 14, marginTop: 14 }}>
              <Text style={{ color: "white", opacity: 0.8, lineHeight: 20 }}>{background.desc}</Text>
            </View>
          </ImageBackground>
        </View>
      </View>

      <View style={{ marginHorizontal: 14 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 24 , marginTop:20}}>
          Continue Watching
        </Text>

        <ImageBackground
          source={require('../components/images/movies/mutantsbig.jpg')}
          style={{ height: 250, width: '100%', backgroundColor: '#000' }}
        >
          <Text style={{ color: 'white', padding: 14 }}>The New Mutants</Text>
          <TouchableOpacity style={{ ...styles.playIconContainer, position: 'absolute', top: '40%', right: '40%' }}>
            <FontAwesome5 name='play' size={22} color="#02ad94" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>My List </Text>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'normal' }}>View All </Text>
        </View>

        <FlatList
          style={{ marginBottom: 30 }}
          data={list}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ marginRight: 20 }}>
                <Image source={item.image} style={{ height: 300, width: 200 }} />
                <View style={{ position: "absolute", height: 5, width: '100%', backgroundColor: '#02ad94' }}></View>
                <FontAwesome5 name="play" size={38} color="#fff" style={{ position: "absolute", top: '45%', left: '45%', opacity: 0.8 }} />
              </TouchableOpacity>

            )
          }}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carouselContentContainer: {
    flex: 1,
    backgroundColor: '#000',
    height: 720,
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

  playIconContainer: {
    backgroundColor: '#212121',
    padding: 18,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderWidth: 4,
    borderColor: "rgba(2,173,148,0.2)",
    marginBottom: 14

  }


});

export default App
