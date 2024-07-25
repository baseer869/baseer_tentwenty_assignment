import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet } from 'react-native';
import { movieSearch } from '../../apis/movieSearch';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      const response = await movieSearch(query);
      setMovies(response);
    } else {
      setMovies([]);
    }
  };

  const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => (
    <View style={styles.movieItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        value={query}
        onChangeText={fetchMovies}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem movie={item} />}
        contentContainerStyle={{ marginVertical:10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  poster: {
    width: 140,
    height: 100,
    borderRadius:8
  },
  movieInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color:"#000"
  },
  genre: {
    fontSize: 14,
    color: '#666',
  },
});

export default MovieSearch;
