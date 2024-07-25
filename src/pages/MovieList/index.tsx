// MoviesList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { getMoviesList, Movie } from '../../apis/moviesList';
import LinearGradient from 'react-native-linear-gradient';

const MoviesList: React.FC = ({navigation}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMoviesList();
        setMovies(moviesData.results);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('MovieDetails', { movie: item })} style={styles.movieCard}>
      <ImageBackground 
        source={{ uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}` }} 
        style={styles.movieImage}
      >
        <LinearGradient 
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
          style={styles.gradient}
        >
          <Text style={styles.movieTitle}>{item.title}</Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Text style={{ textAlign:'center'}}>Loading...</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
  },
  movieCard: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
  },
  movieImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end', // Position the gradient at the bottom
  },
  movieTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  gradient: {
    padding: 10,
    justifyContent: 'flex-end',
  },
});

export default MoviesList;
