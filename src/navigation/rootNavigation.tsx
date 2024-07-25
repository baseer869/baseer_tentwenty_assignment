// RootNavigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import MoviesList from '../pages/MovieList/index';
import MovieSearch from '../pages/Search/index';
import MovieDetails from '../pages/MovieDetail/index';
import Header from '../components/Header/Header';
import CustomVideoPlayer from '../pages/Player';

type RootStackParamList = {
  Movies: undefined;
  Search: undefined;
  MovieDetails: undefined
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Movies"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,  // Use a preset transition for iOS
        }}
      >
        <Stack.Screen 
          name="Movies" 
          component={MoviesList} 
          options={{ header: () => <Header /> }} 
        />
        <Stack.Screen 
          name="Search" 
          component={MovieSearch} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetails} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="VideoPlayer" 
          component={CustomVideoPlayer} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default RootNavigation;
