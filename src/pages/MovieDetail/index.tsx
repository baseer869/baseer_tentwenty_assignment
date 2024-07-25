import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ACCESS_TOKEN } from '../../apis/moviesList';
import axios from 'axios';
import icons from '../../components/icons';

type RootStackParamList = {
  MovieDetails: { movie: Movie };
};

type MovieDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

type MovieDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;

type Props = {
  route: MovieDetailsScreenRouteProp;
  navigation: MovieDetailsScreenNavigationProp;
};

const MovieDetails: React.FC<Props> = () => {
  const route = useRoute<MovieDetailsScreenRouteProp>();
  const { movie } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const fetchTrailer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      const trailers = response.data.results;

      const trailer = trailers.find((video: any) => video.site === 'YouTube');

      if (trailer) {
        navigation.navigate('VideoPlayer', { trailerUrl: trailer.key });
      } else {
        Alert.alert('No trailer found');
      }
    } catch (error) {
      Alert.alert('Error fetching trailer');
    } finally {
      setLoading(false);
    }
  };
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.55;
  const genreColors: { [key: string]: string } = {
    Action: '#15D2BC',
    Thriller: '#E26CA5',
    Science: '#564CA3',
    Fiction: '##CD9D0F',
  };
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }} style={[styles.poster, { height: imageHeight }]} >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={icons.arrow_back} style={{ width: 20, height: 20, resizeMode: 'contain' }} tintColor={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Watch</Text>
          </View>
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0.5)',
              'rgba(0, 0, 0, 0.8)',
              'rgba(0, 0, 0, 0.9)',
              'rgba(0, 0, 0, 0.9)',
            ]}
            style={[styles.gradient, { height: imageHeight * 0.6, top: imageHeight * 0.4 }]}
          >

          <View style={{ flex: 1, justifyContent:'center' }}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.releaseDate}>In Theaters December 22, 2021</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={fetchTrailer}>
              <Text style={styles.buttonText}>Watch Trailer</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
         </ImageBackground>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genresContainer}>
            {['Action', 'Thriller', 'Science', 'Fiction'].map((genre, index) => (
              <Text key={index} style={[styles.genre, { backgroundColor: genreColors[genre] }]}>
                {genre}
              </Text>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    width: '100%',
    // position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
  },
  infoContainer: {
    flex:1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 10
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    left: 30
  },
  releaseDate: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 16,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'rgba(97, 195, 242, 1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 16,
    alignItems: 'center',
    width: "70%",
    alignSelf: 'center'
  },
  button2: {
    borderColor: 'rgba(97, 195, 242, 1)',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 16,
    alignItems: 'center',
    width: "70%",
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
    marginBottom: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  genre: {
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 20,
    margin: 4,
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
  },
  description: {
    fontSize: 16,
    color: '#8F8F8F',
  },
});

export default MovieDetails;
